import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Quote } from '@/lib/models'
import nodemailer from 'nodemailer'

// Simple spam protection - check for common spam patterns
function isSpam(data: any): boolean {
  const spamPatterns = [
    /http[s]?:\/\//i,
    /www\./i,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  ]
  
  const message = (data.message || '').toLowerCase()
  const name = (data.name || '').toLowerCase()
  
  // Check for excessive links or emails in message
  const linkMatches = message.match(/http[s]?:\/\//gi) || []
  if (linkMatches.length > 2) return true
  
  // Check for suspicious patterns
  if (message.includes('click here') || message.includes('buy now')) {
    return true
  }
  
  return false
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot spam protection (hidden field that should be empty)
    if (data.website) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA v2 token with Google API
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    // Check if reCAPTCHA is properly configured
    const isRecaptchaConfigured = recaptchaSecretKey && 
                                   recaptchaSecretKey !== 'YOUR_SECRET_KEY_HERE' &&
                                   recaptchaSiteKey

    if (!isRecaptchaConfigured) {
      console.warn('reCAPTCHA v2 not fully configured. Skipping verification for now.', {
        hasSecretKey: !!recaptchaSecretKey && recaptchaSecretKey !== 'YOUR_SECRET_KEY_HERE',
        hasSiteKey: !!recaptchaSiteKey,
      })
      // Continue without reCAPTCHA verification (temporary - for development)
      // In production, you should have proper reCAPTCHA configured
    }

    // Only verify reCAPTCHA if it's properly configured
    if (isRecaptchaConfigured) {
      if (!data.recaptchaToken) {
        console.error('reCAPTCHA token is missing from request')
        return NextResponse.json(
          { error: 'reCAPTCHA token is required' },
          { status: 400 }
        )
      }

      try {
        console.log('Verifying reCAPTCHA v2 token...')
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              secret: recaptchaSecretKey!,
              response: data.recaptchaToken,
            }),
          }
        )

        if (!recaptchaResponse.ok) {
          const errorText = await recaptchaResponse.text()
          console.error('reCAPTCHA v2 API error:', {
            status: recaptchaResponse.status,
            statusText: recaptchaResponse.statusText,
            error: errorText,
          })
          
          return NextResponse.json(
            { error: 'reCAPTCHA verification failed. Please try again.' },
            { status: 400 }
          )
        }

        const recaptchaResult = await recaptchaResponse.json()
        console.log('reCAPTCHA v2 verification result:', {
          success: recaptchaResult.success,
          challenge_ts: recaptchaResult['challenge_ts'],
          hostname: recaptchaResult.hostname,
        })

        // Check if the verification was successful
        if (!recaptchaResult.success) {
          const errorCodes = recaptchaResult['error-codes'] || []
          console.error('reCAPTCHA v2 verification failed:', errorCodes)
          return NextResponse.json(
            { error: 'reCAPTCHA verification failed. Please complete the reCAPTCHA challenge and try again.' },
            { status: 400 }
          )
        }
      } catch (recaptchaError: any) {
        console.error('reCAPTCHA v2 verification error:', recaptchaError)
        return NextResponse.json(
          { error: `reCAPTCHA verification error: ${recaptchaError.message || 'Unknown error'}` },
          { status: 500 }
        )
      }
    } else {
      console.warn('Skipping reCAPTCHA verification - not configured. Form submission will proceed.')
    }

    // Spam protection
    if (isSpam(data)) {
      return NextResponse.json(
        { error: 'Message flagged as spam' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message || !data.projectType || !data.privacyAccepted || !data.clientType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate organization name if client type is organization
    if (data.clientType === 'organisatie' && !data.organizationName) {
      return NextResponse.json(
        { error: 'Organization name is required when Organization is selected' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    // Save quote to database
    const quote: Omit<Quote, '_id'> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      clientType: data.clientType,
      organizationName: data.organizationName || undefined,
      projectLocation: data.projectLocation || undefined,
      projectType: data.projectType,
      message: data.message,
      documents: data.documents || [],
      privacyAccepted: data.privacyAccepted,
      type: data.type || 'contact',
      status: 'new',
      createdAt: new Date(),
    }

    const result = await db.collection<Quote>('quotes').insertOne(quote as any)

    // Create notification
    await db.collection('notifications').insertOne({
      quoteId: result.insertedId,
      type: data.type || 'contact',
      read: false,
      createdAt: new Date(),
    })

    // Send email notification (if SMTP is configured)
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.SMTP_USER, // Admin email
          subject: `New ${data.type === 'quote' ? 'Quote Request' : 'Contact'} from ${data.name}`,
          html: `
            <h2>New ${data.type === 'quote' ? 'Quote Request' : 'Contact'} Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Client Type:</strong> ${data.clientType === 'organisatie' ? 'Organization' : 'Private'}</p>
            ${data.organizationName ? `<p><strong>Organization Name:</strong> ${data.organizationName}</p>` : ''}
            ${data.projectLocation ? `<p><strong>Project Location:</strong> ${data.projectLocation}</p>` : ''}
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
            ${data.documents && data.documents.length > 0 ? `<p><strong>Documents:</strong> ${data.documents.map((doc: string) => `<a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${doc}">${doc}</a>`).join(', ')}</p>` : ''}
          `,
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error processing contact form:', error)
    const errorMessage = error?.message || 'Internal server error'
    return NextResponse.json(
      { error: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error' },
      { status: 500 }
    )
  }
}

