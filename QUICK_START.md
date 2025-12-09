# Quick Start Guide - MongoDB Compass Setup

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create .env.local

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/theta-engineering
JWT_SECRET=your-super-secret-jwt-key-change-this
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

## Step 3: Create Admin User in MongoDB Compass

1. **Open MongoDB Compass** and connect to your MongoDB instance
2. **Select or create** the database: `theta-engineering`
3. **Create a new collection** called `admins`
4. **Click "Insert Document"** and paste this (replace the password hash):

```json
{
  "email": "admin@theta-engineering.com",
  "password": "PASTE_BCRYPT_HASH_HERE",
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

### How to Get the Password Hash:

**Easiest Method - Use the script:**
```bash
npm run generate-hash
```
This will prompt for your password and generate a ready-to-paste JSON document!

**Alternative - Online Tool:**
1. Go to: https://bcrypt-generator.com/
2. Enter your desired password (min 8 characters)
3. Set rounds to: **10**
4. Click "Generate Hash"
5. Copy the hash and paste it in the `password` field above

**Alternative - Quick command:**
```bash
node -e "const bcrypt=require('bcryptjs');bcrypt.hash('yourpassword',10).then(h=>console.log('Hash:',h))"
```

**Example:**
- Password: `admin123`
- Hash: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

## Step 4: Run the Development Server

```bash
npm run dev
```

## Step 5: Access the Website

- **Public Website**: http://localhost:3000/en or http://localhost:3000/nl
- **Admin Login**: http://localhost:3000/admin/login
  - Email: `admin@theta-engineering.com` (or whatever you used)
  - Password: The password you hashed in step 3

## That's It! 🎉

You can now:
- Browse the website
- Login to the admin panel
- Add projects
- Manage quotes

## Optional: Email Notifications

If you want email notifications for new quotes, add to `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

