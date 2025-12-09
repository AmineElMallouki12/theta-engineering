# Vercel Environment Variables - Complete Setup

## Cloudinary Configuration

Add these three environment variables to Vercel:

### 1. CLOUDINARY_CLOUD_NAME
```
dlxyfd8fp
```

### 2. CLOUDINARY_API_KEY
```
959798173322919
```

### 3. CLOUDINARY_API_SECRET
```
wyculK06Oa27L38jfCj8B7vPWso
```

## How to Add to Vercel

1. Go to: https://vercel.com/your-account/theta-engineering
2. Click **Settings** → **Environment Variables**
3. For each variable above:
   - Click **Add New**
   - Paste the **Key** name
   - Paste the **Value**
   - Select **All Environments** (Production, Preview, Development)
   - Click **Save**

## After Adding Variables

1. Go to **Deployments**
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes for deployment to complete

## Test

After redeployment:
1. Go to: `https://theta-engineering.vercel.app/admin/projects`
2. Click **Add Project** or edit an existing project
3. Try uploading an image
4. It should work! ✅

## All Your Environment Variables

Make sure you have all of these in Vercel:

- ✅ `MONGODB_URI` - Your MongoDB Atlas connection string
- ✅ `MONGODB_DB` - `Theta-Engineering`
- ✅ `JWT_SECRET` - Your JWT secret
- ✅ `NEXT_PUBLIC_SITE_URL` - `https://theta-engineering.vercel.app`
- ✅ `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - `6Lcj6SUsAAAAAKHc0sQjQfjR4opyf4IhpMqnnupl`
- ✅ `RECAPTCHA_SECRET_KEY` - `6Lcj6SUsAAAAABoSM8p0moORkBuVb75gO9Qb1hN_`
- ✅ `CLOUDINARY_CLOUD_NAME` - `dlxyfd8fp`
- ✅ `CLOUDINARY_API_KEY` - `959798173322919`
- ✅ `CLOUDINARY_API_SECRET` - `wyculK06Oa27L38jfCj8B7vPWso`

