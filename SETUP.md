# Theta Engineering Website - Setup Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud like MongoDB Atlas)
- Email account for SMTP (optional, for quote notifications)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/theta-engineering
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/theta-engineering

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (for sending quote notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Node Environment
NODE_ENV=development
```

### 3. Initialize Admin User

After setting up MongoDB, you need to create an admin user manually using MongoDB Compass:

**Using MongoDB Compass (Recommended for Testing):**

1. Open MongoDB Compass and connect to your database
2. Select your database (or create one if needed)
3. Create a new collection called `admins`
4. Click "Insert Document" and add the following document:

```json
{
  "email": "admin@theta-engineering.com",
  "password": "YOUR_BCRYPT_HASHED_PASSWORD",
  "createdAt": ISODate("2025-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2025-01-01T00:00:00.000Z")
}
```

**To hash your password, you can:**

**Option A: Use an online bcrypt generator**
- Go to https://bcrypt-generator.com/
- Enter your password (minimum 8 characters)
- Use rounds: 10
- Copy the hashed password and paste it in the `password` field

**Option B: Use Node.js (quick hash)**
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourpassword', 10).then(hash => console.log(hash))"
```

**Example document:**
```json
{
  "email": "admin@theta-engineering.com",
  "password": "$2a$10$rOzJ8K8K8K8K8K8K8K8K8O8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K",
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

**Alternative: Using the npm script (if preferred)**
```bash
npm run init-admin
```

**Alternative: Using the API endpoint**
```bash
# Make a POST request to /api/admin/init
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'
```

### 4. Run Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── [locale]/          # Multilingual pages (en, nl)
│   │   ├── about/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── careers/
│   │   ├── contact/
│   │   ├── privacy/
│   │   └── terms/
│   ├── admin/              # Admin panel
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── quotes/
│   │   ├── projects/
│   │   └── settings/
│   └── api/                # API routes
├── components/             # React components
├── lib/                    # Utilities and configurations
├── messages/               # Translation files
└── public/                 # Static assets
```

## Features

### Public Website
- ✅ Multilingual support (Dutch + English)
- ✅ Home, About, Services, Projects, Careers, Contact pages
- ✅ Contact/Quote forms with spam protection
- ✅ Legal pages (Privacy Policy, Terms)
- ✅ SEO optimized (sitemap, robots.txt, metadata)
- ✅ Responsive, modern design

### Admin Panel
- ✅ Secure authentication (JWT)
- ✅ Dashboard with statistics
- ✅ Quote management (view, mark as read, archive)
- ✅ Notifications for new quotes
- ✅ Project management (add/edit with images)
- ✅ Password change functionality

## Admin Access

1. Navigate to `/admin/login`
2. Use the credentials you created during initialization
3. After login, you'll have access to:
   - Dashboard: Overview of quotes and projects
   - Quotes: Manage all contact/quote submissions
   - Projects: Add and edit portfolio projects
   - Settings: Change your password

## Adding Projects

1. Login to admin panel
2. Go to "Projects" section
3. Click "Add New Project"
4. Fill in:
   - Title (English and Dutch)
   - Description (English and Dutch)
   - Content (optional, English and Dutch)
   - Category, Client, Year (optional)
   - Upload images
   - Mark as featured if needed
5. Click "Create Project"

## Managing Quotes

1. Login to admin panel
2. Go to "Quotes" section
3. View all submissions
4. Filter by status: All, New, Read, Archived
5. Actions:
   - Mark as Read: Moves quote to read status
   - Archive: Moves quote to archive
   - Unarchive: Restores from archive

## Email Notifications

When a new quote/contact form is submitted:
- The submission is saved to the database
- A notification is created
- An email is sent to the admin (if SMTP is configured)

## SEO Configuration

The website includes:
- Sitemap generation (`/sitemap.xml`)
- Robots.txt configuration
- Meta tags for each page
- Language alternates for multilingual SEO
- Open Graph tags

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Make sure to update:
- `MONGODB_URI` with production database
- `JWT_SECRET` with a strong random string
- `NEXT_PUBLIC_SITE_URL` with your domain
- `NODE_ENV=production`
- SMTP credentials for production email

### Recommended Hosting

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

## Support

For questions or issues, contact the development team.

