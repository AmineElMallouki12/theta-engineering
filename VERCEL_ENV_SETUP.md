# Vercel Environment Variables Setup

## ⚠️ IMPORTANT: Set These Environment Variables in Vercel

Your deployment will fail if these environment variables are not set in Vercel.

## Step-by-Step Instructions

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each of the following variables:

### Required Environment Variables

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lcj6SUsAAAAAKHc0sQjQfjR4opyf4IhpMqnnupl
```

```
RECAPTCHA_SECRET_KEY=6Lcj6SUsAAAAABoSM8p0moORkBuVb75gO9Qb1hN_
```

```
MONGODB_URI=mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?retryWrites=true&w=majority
```

```
MONGODB_DB=Theta-Engineering
```

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```
**⚠️ Generate a strong random string for JWT_SECRET!** You can use:
- Online generator: https://randomkeygen.com/
- Or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

```
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```
**⚠️ Replace `your-project-name` with your actual Vercel project name!**

### Optional Environment Variables (for email notifications)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@theta-engineering.com
```

## After Adding Variables

1. **Redeploy** your project (Vercel will automatically redeploy when you add env vars, or you can trigger a new deployment)
2. Wait for the build to complete
3. Your site should now work!

## Troubleshooting

### Build Still Failing?

1. **Check the build logs** in Vercel dashboard
2. **Verify all variables are set** - especially `MONGODB_URI` and `JWT_SECRET`
3. **Check variable names** - they must match exactly (case-sensitive)
4. **Make sure `NEXT_PUBLIC_SITE_URL`** matches your actual Vercel domain

### Common Errors

- **"MONGODB_URI is not set"** → Add the `MONGODB_URI` environment variable
- **"JWT_SECRET is not set"** → Add the `JWT_SECRET` environment variable
- **Build timeout** → Check MongoDB Atlas network access (whitelist Vercel IPs or use 0.0.0.0/0)

## Security Notes

- ✅ Environment variables in Vercel are encrypted
- ✅ Never commit `.env.local` to Git (already in `.gitignore`)
- ⚠️ Consider changing your MongoDB password after testing
- ⚠️ Use a strong, unique `JWT_SECRET` in production

