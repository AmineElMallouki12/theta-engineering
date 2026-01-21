# Simple Way to Reset Your Admin Password

## What's Wrong?

You have **two separate passwords**:

1. **MongoDB Atlas Password** (in `.env.local`) - Connects your app to MongoDB
2. **Admin Panel Password** (in database) - What you use to login at `/admin/login`

The password in your database is **hashed** (encrypted), so you can't just see what it is. That's why even if you think you know the password, it might not work.

## Simple Fix: Use MongoDB Compass

### Step 1: Download MongoDB Compass
- Go to: https://www.mongodb.com/try/download/compass
- Download and install it

### Step 2: Connect to Your Database
1. Open MongoDB Compass
2. Paste your MongoDB connection string from `.env.local`
   - It looks like: `mongodb+srv://username:password@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0`
3. Click "Connect"

### Step 3: Find Your Admin User
1. Click on the `Theta-Engineering` database
2. Click on the `admins` collection
3. You'll see your admin user document

### Step 4: Generate a New Password Hash
1. Go to: https://bcrypt-generator.com/
2. Enter your new password (e.g., `admin123`)
3. Set rounds to: **10**
4. Click "Generate Hash"
5. Copy the hash (it starts with `$2a$10$...`)

### Step 5: Update the Password in Compass
1. In MongoDB Compass, click on your admin document
2. Click the "Edit Document" button (pencil icon)
3. Find the `password` field
4. Replace the value with the new hash you copied
5. Click "Update"

### Step 6: Check Your Username
While you're in Compass, check what the `username` field says - that's what you need to use to login!

### Step 7: Login
1. Go to: `http://localhost:3000/admin/login`
2. Enter the **username** you saw in Compass
3. Enter your **new password** (the plain text one, not the hash)

## That's It!

You're done! The password is now reset and you can login.
