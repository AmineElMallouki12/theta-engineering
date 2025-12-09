# reCAPTCHA Enterprise Setup Guide

This guide explains how to set up Google reCAPTCHA Enterprise for the contact form to prevent spam submissions.

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on "+" to create a new site
3. Fill in the form:
   - **Label**: Theta Engineering Contact Form (or any name you prefer)
   - **reCAPTCHA type**: Select "reCAPTCHA Enterprise" → "Score-based v3" (invisible)
   - **Domains**: Add your domain(s):
     - `localhost` (for local development)
     - `yourdomain.com` (for production)
     - `www.yourdomain.com` (if you use www)
4. Accept the reCAPTCHA Terms of Service
5. Click "Submit"

## Step 2: Get Your Keys

After creating the site, you'll receive:
- **Site Key** (public key) - This is safe to expose in your frontend code
- **Secret Key** (private key) - Keep this secret! Never expose it in frontend code

**Important:** 
- Make sure both keys are from the same reCAPTCHA Enterprise site
- The site key and secret key must match (from the same site)
- The domain must be registered in the reCAPTCHA Enterprise console
- reCAPTCHA Enterprise is invisible and executes automatically on form submission

## Step 3: Add Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
# reCAPTCHA Enterprise Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lfd7SQsAAAAAMS1EjsRXzrOq78UmJZylDwbTHjT
RECAPTCHA_API_KEY=your_api_key_here
RECAPTCHA_PROJECT_ID=stellar-aleph-475808-f7
```

**Important:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Your reCAPTCHA Enterprise site key (used in frontend)
- `RECAPTCHA_API_KEY` - Your Google Cloud API key for reCAPTCHA Enterprise (get from Google Cloud Console)
- `RECAPTCHA_PROJECT_ID` - Your Google Cloud project ID (e.g., `stellar-aleph-475808-f7`)

**How to get your API key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Navigate to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "API Key"
5. Copy the API key and add it to `.env.local` as `RECAPTCHA_API_KEY`

## Step 4: Restart Your Development Server

After adding the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## Testing

1. Go to your contact form
2. Fill out the form
3. You should see the reCAPTCHA checkbox appear
4. Check the "I'm not a robot" box
5. Complete any challenges if prompted
6. Submit the form

## Troubleshooting

### reCAPTCHA not appearing
- Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Make sure your domain is registered in the reCAPTCHA admin console
- Check browser console for any errors

### "reCAPTCHA verification failed" error
- Verify that `RECAPTCHA_SECRET_KEY` is set correctly in your `.env.local`
- Check that the secret key matches the site key
- Ensure your server can make outbound requests to Google's API

### reCAPTCHA works locally but not in production
- Add your production domain to the reCAPTCHA admin console
- Make sure environment variables are set in your production environment (Vercel, etc.)

## Notes

- The reCAPTCHA widget will automatically reset after a successful submission
- If the token expires, users will need to verify again
- The widget supports both Dutch and English based on the current locale

