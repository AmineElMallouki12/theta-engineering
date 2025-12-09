'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReCaptcha, { ReCaptchaRef } from './ReCaptcha'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  clientType: z.enum(['organisatie', 'particulier']),
  organizationName: z.string().optional(),
  projectLocation: z.string().optional(),
  projectType: z.enum(['constructief-ontwerp', 'beoordeling-veiligheid', 'projectmanagement', 'inspectie-advies']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy statement',
  }),
  type: z.enum(['quote', 'contact']),
}).refine((data) => {
  // If clientType is 'organisatie', organizationName is required
  if (data.clientType === 'organisatie' && !data.organizationName) {
    return false
  }
  return true
}, {
  message: 'Organization name is required when Organization is selected',
  path: ['organizationName'],
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  type?: 'quote' | 'contact'
  locale: string
}

export default function ContactForm({ type = 'contact', locale }: ContactFormProps) {
  const t = useTranslations('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<boolean[]>([])
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCaptchaRef>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type,
      privacyAccepted: false,
      clientType: 'particulier',
    },
  })

  const clientType = watch('clientType')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    const allowedExtensions = ['.pdf', '.dwg', '.jpg', '.jpeg', '.png', '.docx', '.doc']
    
    const validFiles = files.filter(file => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase()
      return allowedTypes.includes(file.type) || allowedExtensions.includes(ext)
    })

    if (validFiles.length !== files.length) {
      alert('Some files were rejected. Only PDF, DWG, JPG, DOCX files are allowed.')
      return
    }

    // Validate file sizes (max 10MB per file)
    const sizeValidFiles = validFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit`)
        return false
      }
      return true
    })

    setUploadedFiles(prev => [...prev, ...sizeValidFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async (files: File[]): Promise<Array<{ url: string; filename: string; id: string }>> => {
    const uploadedUrls: Array<{ url: string; filename: string; id: string }> = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadingFiles(prev => {
        const newArr = [...prev]
        newArr[i] = true
        return newArr
      })

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/contact/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          // Store both URL and filename for better display in admin panel
          uploadedUrls.push({
            url: result.url,
            filename: result.filename || file.name,
            id: result.id
          })
        } else {
          console.error(`Failed to upload file ${file.name}`)
        }
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error)
      } finally {
        setUploadingFiles(prev => {
          const newArr = [...prev]
          newArr[i] = false
          return newArr
        })
      }
    }

    return uploadedUrls
  }

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token)
    setRecaptchaError(null)
  }

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(null)
    setRecaptchaError(t('recaptchaExpired'))
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setRecaptchaError(null)

    try {
      // Get reCAPTCHA v2 token (checkbox is already completed by user)
      let token: string | null = null
      if (recaptchaRef.current) {
        try {
          token = await recaptchaRef.current.execute()
          if (!token) {
            setRecaptchaError('Please complete the reCAPTCHA challenge')
            setIsSubmitting(false)
            return
          }
        } catch (error) {
          console.warn('reCAPTCHA execution error:', error)
          setRecaptchaError('reCAPTCHA verification failed. Please try again.')
          setIsSubmitting(false)
          return
        }
      } else {
        console.warn('reCAPTCHA ref is not available')
        setRecaptchaError('reCAPTCHA is not loaded. Please refresh the page.')
        setIsSubmitting(false)
        return
      }

      // Upload files first
      let documentUrls: Array<{ url: string; filename: string; id: string }> = []
      if (uploadedFiles.length > 0) {
        documentUrls = await uploadFiles(uploadedFiles)
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          documents: documentUrls,
          recaptchaToken: token,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setUploadedFiles([])
        setRecaptchaToken(null)
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || t('error')
        console.error('Form submission error:', errorMessage, errorData)
        
        if (errorMessage.includes('reCAPTCHA') || errorMessage.includes('captcha')) {
          setRecaptchaError(errorMessage)
          setRecaptchaToken(null)
        } else {
          setSubmitStatus('error')
          // Show the actual error message if available
          if (errorMessage && errorMessage !== t('error')) {
            alert(errorMessage)
          }
        }
      }
    } catch (error: any) {
      console.error('Form submission exception:', error)
      setSubmitStatus('error')
      alert(error?.message || t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          {t('fullName')} *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {t('email')} *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          {t('phone')} *
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Client Type */}
      <div>
        <label htmlFor="clientType" className="block text-sm font-medium text-gray-700 mb-2">
          {t('clientType')} *
        </label>
        <select
          {...register('clientType')}
          id="clientType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="particulier">{t('clientTypeParticulier')}</option>
          <option value="organisatie">{t('clientTypeOrganisatie')}</option>
        </select>
        {errors.clientType && (
          <p className="mt-1 text-sm text-red-600">{errors.clientType.message}</p>
        )}
      </div>

      {/* Organization Name - Conditional */}
      {clientType === 'organisatie' && (
        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('organizationName')} *
          </label>
          <input
            {...register('organizationName')}
            type="text"
            id="organizationName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.organizationName && (
            <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
          )}
        </div>
      )}

      {/* Project Location */}
      <div>
        <label htmlFor="projectLocation" className="block text-sm font-medium text-gray-700 mb-2">
          {t('projectLocation')}
        </label>
        <input
          {...register('projectLocation')}
          type="text"
          id="projectLocation"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
          {t('projectType')} *
        </label>
        <select
          {...register('projectType')}
          id="projectType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="constructief-ontwerp">{t('projectType1')}</option>
          <option value="beoordeling-veiligheid">{t('projectType2')}</option>
          <option value="projectmanagement">{t('projectType3')}</option>
          <option value="inspectie-advies">{t('projectType4')}</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
        )}
      </div>

      {/* Project Description */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('message')} *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
          {t('uploadDocuments')}
        </label>
        <input
          type="file"
          id="documents"
          multiple
          accept=".pdf,.dwg,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <p className="mt-1 text-sm text-gray-500">{t('uploadDocumentsHint')}</p>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  {t('removeFile')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Checkbox */}
      <div>
        <label className="flex items-start">
          <input
            {...register('privacyAccepted')}
            type="checkbox"
            className="mt-1 mr-2 h-4 w-4 text-primary-900 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            {t('privacyAccept')} *
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1 text-sm text-red-600">{t('privacyAcceptRequired')}</p>
        )}
      </div>

      {/* reCAPTCHA v2 (checkbox) */}
      <ReCaptcha
        ref={recaptchaRef}
        onVerify={handleRecaptchaVerify}
        onExpire={handleRecaptchaExpire}
        locale={locale}
      />
      {recaptchaError && (
        <p className="mt-2 text-sm text-red-600">{recaptchaError}</p>
      )}

      <input type="hidden" {...register('type')} />

      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {t('success')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {t('error')}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('sending') : t('send')} *
      </button>

      <p className="text-xs text-gray-500 text-center">* {t('requiredField')}</p>
    </form>
  )
}
