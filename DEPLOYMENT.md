# Deployment Guide

This guide will help you deploy the Theta Engineering website to Vercel and set up MongoDB Atlas.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- MongoDB Atlas account (sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

## Step 1: Push to GitHub

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Theta Engineering website"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `theta-engineering` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/theta-engineering.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project (e.g., "Theta Engineering")

### 2.2 Create a Cluster

1. Click "Build a Database"
2. Choose the **FREE** (M0) tier
3. Select a cloud provider and region (choose closest to your users)
4. Click "Create Cluster"
5. Wait 3-5 minutes for the cluster to be created

### 2.3 Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and generate a secure password
5. **Save the password** - you'll need it for the connection string
6. Set privileges to "Read and write to any database"
7. Click "Add User"

### 2.4 Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add Vercel's IP ranges or use 0.0.0.0/0 (less secure but easier)
5. Click "Confirm"

### 2.5 Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "5.5 or later"
5. Copy the connection string
6. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<username>` and `<password>` with your database user credentials
8. Add your database name at the end:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/Theta-Engineering?retryWrites=true&w=majority
   ```

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3.2 Configure Environment Variables

In the Vercel project settings, add these environment variables:

#### Required Variables:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lcj6SUsAAAAAKHc0sQjQfjR4opyf4IhpMqnnupl
RECAPTCHA_SECRET_KEY=6Lcj6SUsAAAAABoSM8p0moORkBuVb75gO9Qb1hN_
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/Theta-Engineering?retryWrites=true&w=majority
MONGODB_DB=Theta-Engineering
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### Optional Variables (for email notifications):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@theta-engineering.com
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### 3.4 Set Up Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## Step 4: Initialize Admin User

After deployment, you need to create an admin user. You have two options:

### Option A: Run Script Locally (Recommended)

1. Update your local `.env.local` with the MongoDB Atlas connection string
2. Run:
   ```bash
   npm run init-admin
   ```
3. Follow the prompts to create an admin user

### Option B: Use MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your Atlas connection string
3. Navigate to `Theta-Engineering` database
4. Create a `users` collection
5. Insert a document with:
   ```json
   {
     "email": "admin@theta-engineering.com",
     "password": "<hashed-password>",
     "role": "admin",
     "createdAt": new Date()
   }
   ```
6. Generate password hash using:
   ```bash
   npm run generate-hash
   ```

## Step 5: Verify Deployment

1. Visit your Vercel URL
2. Test the contact form
3. Log in to the admin panel at `/admin/login`
4. Check that quotes are being saved to MongoDB Atlas

## Troubleshooting

### MongoDB Connection Issues

- Verify your connection string includes the database name
- Check that your IP address is whitelisted in Atlas
- Ensure your database user has read/write permissions

### reCAPTCHA Issues

- Verify both site key and secret key are set correctly
- Check that the keys match (v2 checkbox keys)
- Ensure `NEXT_PUBLIC_SITE_URL` matches your Vercel domain

### Build Errors

- Check Vercel build logs for specific errors
- Ensure all environment variables are set
- Verify Node.js version compatibility (Vercel uses Node 18+ by default)

## Security Notes

- Never commit `.env.local` to Git (already in `.gitignore`)
- Use strong, unique passwords for MongoDB Atlas
- Rotate `JWT_SECRET` regularly in production
- Consider restricting MongoDB Atlas IP access to Vercel IPs only
- Use environment variables for all sensitive data

## Support

For issues or questions:
- Check Vercel logs: Project → Deployments → View Function Logs
- Check MongoDB Atlas logs: Database → Metrics
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

