'use client'

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      render: (container: HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
      }) => number
      reset: (widgetId: number) => void
      getResponse: (widgetId: number) => string
    }
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void
  onExpire: () => void
  locale?: string
}

export interface ReCaptchaRef {
  execute: () => Promise<string | null>
  reset: () => void
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(({ onVerify, onExpire, locale = 'nl' }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [widgetId, setWidgetId] = useState<number | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  useImperativeHandle(ref, () => ({
    execute: async () => {
      if (!siteKey) {
        console.error('reCAPTCHA site key is not configured')
        return null
      }

      if (!isLoaded || widgetId === null) {
        console.error('reCAPTCHA is not loaded yet')
        return null
      }

      if (!window.grecaptcha) {
        console.error('window.grecaptcha is not available')
        return null
      }

      try {
        const token = window.grecaptcha.getResponse(widgetId)
        if (token) {
          console.log('reCAPTCHA token retrieved successfully')
          return token
        } else {
          console.error('reCAPTCHA token is empty. User may not have completed the challenge.')
          return null
        }
      } catch (error) {
        console.error('reCAPTCHA execution error:', error)
        onExpire()
        return null
      }
    },
    reset: () => {
      if (widgetId !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetId)
      }
    },
  }), [isLoaded, widgetId, onExpire])

  useEffect(() => {
    if (!siteKey) {
      console.error('reCAPTCHA site key is not configured')
      return
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true)
      return
    }

    // Load reCAPTCHA v2 script
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?hl=${locale}`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log('reCAPTCHA v2 loaded successfully')
          setIsLoaded(true)
        })
      } else {
        console.error('reCAPTCHA script loaded but grecaptcha is not available')
      }
    }

    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script')
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [siteKey, locale])

  useEffect(() => {
    if (!isLoaded || !containerRef.current || widgetId !== null) {
      return
    }

    if (!window.grecaptcha) {
      return
    }

    try {
      const id = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          console.log('reCAPTCHA verified successfully')
          onVerify(token)
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired')
          onExpire()
        },
        'error-callback': (error?: any) => {
          console.error('reCAPTCHA error occurred:', error)
          // Common error: invalid key type usually means keys don't match or wrong version
          if (error && typeof error === 'string' && error.includes('invalid')) {
            console.error('reCAPTCHA key type error - make sure your site key and secret key match and are both for reCAPTCHA v2 (checkbox)')
          }
          onExpire()
        },
      })
      setWidgetId(id)
      setRenderError(null)
    } catch (error: any) {
      console.error('Failed to render reCAPTCHA:', error)
      // Check for specific error messages
      if (error?.message?.includes('invalid') || error?.message?.includes('key') || error?.toString().includes('invalid')) {
        setRenderError('Invalid reCAPTCHA key type. Please verify your keys are for reCAPTCHA v2 (checkbox) and match each other.')
      } else {
        setRenderError('Failed to load reCAPTCHA. Please check your configuration.')
      }
    }
  }, [isLoaded, siteKey, onVerify, onExpire, widgetId])

  useEffect(() => {
    // Reset render error when site key changes
    setRenderError(null)
  }, [siteKey])

  if (!siteKey) {
    return (
      <div className="text-sm text-red-600 p-2 border border-red-300 rounded">
        reCAPTCHA is not configured. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.
      </div>
    )
  }

  if (renderError) {
    return (
      <div className="text-sm text-red-600 p-3 border border-red-300 rounded bg-red-50">
        <p className="font-semibold mb-2">reCAPTCHA Configuration Error</p>
        <p className="mb-2">{renderError}</p>
        <p className="text-xs mt-2">Please check:</p>
        <ul className="text-xs list-disc list-inside mt-1 space-y-1">
          <li>Your site key and secret key are from the same reCAPTCHA site</li>
          <li>Both keys are for reCAPTCHA v2 (checkbox), not v3 or Enterprise</li>
          <li>Your domain is registered in the reCAPTCHA admin console</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div ref={containerRef} id="recaptcha-container" />
    </div>
  )
})

ReCaptcha.displayName = 'ReCaptcha'

export default ReCaptcha

