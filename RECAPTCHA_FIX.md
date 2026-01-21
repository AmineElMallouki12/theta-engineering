# reCAPTCHA "Invalid Key Type" Error Fix

## The Problem
The error "FOUT voor site-eigenaar: ongeldig sleuteltype" (ERROR for site owner: invalid key type) occurs when:
1. Your site key and secret key don't match (from different reCAPTCHA sites)
2. You're using reCAPTCHA v3 or Enterprise keys with a v2 widget
3. Your keys are for a different reCAPTCHA type

## The Solution

### Step 1: Create New reCAPTCHA v2 Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **"+"** to create a new site
3. Fill in the form:
   - **Label**: Theta Engineering Contact Form
   - **reCAPTCHA type**: Select **"reCAPTCHA v2"** → **"I'm not a robot" Checkbox** (NOT v3 or Enterprise)
   - **Domains**: Add your domain(s):
     - `localhost` (for local development)
     - `yourdomain.com` (for production)
     - `www.yourdomain.com` (if you use www)
4. Accept the reCAPTCHA Terms of Service
5. Click **"Submit"**

### Step 2: Get Your Keys

After creating the site, you'll see:
- **Site Key** (starts with `6L...`) - This is your `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Secret Key** (starts with `6L...`) - This is your `RECAPTCHA_SECRET_KEY`

**IMPORTANT:** Make sure both keys are from the **same site** and both are for **reCAPTCHA v2 (checkbox)**.

### Step 3: Update Environment Variables

Update your `.env.local` file (or environment variables in Vercel):

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Step 4: Restart Your Server

After updating the environment variables:
1. Stop your development server (Ctrl+C)
2. Restart it: `npm run dev`
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Step 5: Verify

1. Go to your contact form
2. You should see the reCAPTCHA checkbox (not an error message)
3. Check the "I'm not a robot" box
4. Complete any challenges if prompted
5. Submit the form

## Common Issues

### Still seeing the error?
- **Check your keys match**: Site key and secret key must be from the same reCAPTCHA site
- **Verify key type**: Both must be for reCAPTCHA v2 (checkbox), not v3
- **Check domain registration**: Your domain must be registered in the reCAPTCHA admin console
- **Clear browser cache**: Sometimes cached errors persist

### Keys look correct but still not working?
- Make sure you're using **reCAPTCHA v2** keys, not v3 or Enterprise
- Verify your domain is added in the reCAPTCHA admin console
- Check that environment variables are loaded (restart server after changes)

## Testing

After fixing, you should see:
- ✅ A reCAPTCHA checkbox widget (not an error box)
- ✅ "I'm not a robot" checkbox that you can click
- ✅ No error messages in red

If you still see errors, check the browser console (F12) for more details.
