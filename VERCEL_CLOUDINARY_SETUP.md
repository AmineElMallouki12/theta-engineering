# Quick Setup: Add Cloudinary to Vercel

## Your Cloudinary Credentials

Based on what you provided:
- **API Key**: `959798173322919`
- **API Secret**: `wyculK06Oa27L38jfCj8B7vPWso`
- **Cloud Name**: (Check your Cloudinary dashboard - it's usually shown at the top)

## Find Your Cloud Name

1. Go to https://cloudinary.com/console
2. Look at the top of the dashboard
3. You'll see something like: "Cloud Name: **dxyz1234**" or similar
4. Copy that value

## Add to Vercel (Step by Step)

### Step 1: Go to Vercel Environment Variables

1. Go to: https://vercel.com/your-account/theta-engineering
2. Click **Settings** (in the top navigation)
3. Click **Environment Variables** (in the left sidebar)

### Step 2: Add Each Variable

Click **Add New** for each of these:

**Variable 1:**
- **Key**: `CLOUDINARY_CLOUD_NAME`
- **Value**: `your_cloud_name_here` (paste from Cloudinary dashboard)
- **Environment**: Select **All Environments** (Production, Preview, Development)
- Click **Save**

**Variable 2:**
- **Key**: `CLOUDINARY_API_KEY`
- **Value**: `959798173322919`
- **Environment**: Select **All Environments**
- Click **Save**

**Variable 3:**
- **Key**: `CLOUDINARY_API_SECRET`
- **Value**: `wyculK06Oa27L38jfCj8B7vPWso`
- **Environment**: Select **All Environments**
- Click **Save**

### Step 3: Verify

You should now see three variables:
- ✅ `CLOUDINARY_CLOUD_NAME`
- ✅ `CLOUDINARY_API_KEY`
- ✅ `CLOUDINARY_API_SECRET`

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (2-3 minutes)

### Step 5: Test

1. Go to: `https://theta-engineering.vercel.app/admin/projects`
2. Click **Add Project** or edit an existing project
3. Try uploading an image
4. It should work! ✅

## Important Notes

- **No quotes** around the values
- **No spaces** before or after
- Make sure all three are set for **All Environments**
- The Cloud Name is usually something like `dxyz1234` or `your-account-name`

## Troubleshooting

If upload still fails after redeploy:
1. Double-check all three variables are set correctly
2. Make sure Cloud Name has no extra spaces
3. Wait 2-3 minutes after redeploy for changes to take effect
4. Check Vercel logs for any error messages

