# Cloudinary Setup Guide for Image Uploads

## Why Cloudinary?

Vercel's serverless functions have a read-only filesystem, so we can't save files locally. Cloudinary provides cloud-based image storage and is perfect for this use case.

## Step 1: Create a Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a free account (no credit card required)
3. Verify your email address

## Step 2: Get Your Cloudinary Credentials

After signing up, you'll be taken to your dashboard. You'll see:

- **Cloud Name** (e.g., `dxyz1234`)
- **API Key** (e.g., `123456789012345`)
- **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

**Important:** Copy these values - you'll need them in the next step.

## Step 3: Add Environment Variables to Vercel

1. Go to your Vercel project: https://vercel.com/your-account/theta-engineering
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```

   **Important:**
   - Replace `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual values
   - No quotes needed
   - No spaces

4. Make sure they're set for **All Environments** (Production, Preview, Development)
5. Click **Save**

## Step 4: Redeploy

After adding the environment variables:

1. Go to **Deployments**
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Step 5: Test Image Upload

1. Go to your admin panel: `https://theta-engineering.vercel.app/admin/projects`
2. Click **Add Project** or edit an existing project
3. Try uploading an image
4. It should now work! ✅

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB monthly bandwidth
- 25 million transformations per month

This is more than enough for most websites.

## Local Development

For local development, add these to your `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## Troubleshooting

### Error: "Cloudinary is not configured"
- Make sure all three environment variables are set in Vercel
- Make sure there are no quotes or spaces in the values
- Redeploy after adding the variables

### Error: "Invalid API credentials"
- Double-check that you copied the correct values from Cloudinary dashboard
- Make sure the API Secret is correct (it's case-sensitive)

### Images not showing
- Check that the URLs returned are `https://res.cloudinary.com/...`
- Make sure the images are accessible (Cloudinary should make them public by default)

## Alternative: Use Vercel Blob Storage

If you prefer to use Vercel's native solution, you can use Vercel Blob Storage instead. However, Cloudinary is recommended because it also provides:
- Automatic image optimization
- Image transformations (resize, crop, etc.)
- CDN delivery
- Free tier with generous limits

