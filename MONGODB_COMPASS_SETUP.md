# MongoDB Compass - Admin User Setup

## Quick Method: Generate Hash and Copy JSON

Run this command and enter your password when prompted:

```bash
npm run generate-hash
```

This will output a ready-to-paste JSON document for MongoDB Compass.

## Manual Method

### Step 1: Generate Password Hash

**Option A: Using the script**
```bash
npm run generate-hash
```

**Option B: Quick one-liner (replace 'yourpassword' with your actual password)**
```bash
node -e "const bcrypt=require('bcryptjs');bcrypt.hash('yourpassword',10).then(h=>console.log('Hash:',h))"
```

**Option C: Online tool**
- Go to: https://bcrypt-generator.com/
- Enter password, set rounds to 10, generate

### Step 2: Create Admin in MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017` (or your connection string)
3. Select database: `theta-engineering` (or create it)
4. Create collection: `admins`
5. Click "Insert Document"
6. Paste this JSON (replace the password hash):

```json
{
  "email": "admin@theta-engineering.com",
  "password": "PASTE_YOUR_BCRYPT_HASH_HERE",
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

7. Click "Insert"

### Step 3: Test Login

- Go to: http://localhost:3000/admin/login
- Email: `admin@theta-engineering.com`
- Password: The password you hashed

## Example

If your password is `admin123`, the hash might be:
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

So your document would be:
```json
{
  "email": "admin@theta-engineering.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

