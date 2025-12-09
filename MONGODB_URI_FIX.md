# Fix MongoDB Connection String Error

## Error
```
MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"
```

## Cause
The `MONGODB_URI` environment variable in Vercel is either:
- Not set
- Empty
- Has extra spaces or quotes
- Missing the database name

## Solution

### Step 1: Get Your MongoDB Atlas Connection String

Your connection string should be:
```
mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0
```

**Important:** Make sure it includes:
- The database name: `/Theta-Engineering` (after `.net/`)
- No extra spaces or quotes
- Starts with `mongodb+srv://`

### Step 2: Update Vercel Environment Variable

1. Go to your Vercel project: https://vercel.com/your-account/theta-engineering
2. Click on **Settings** → **Environment Variables**
3. Find `MONGODB_URI`
4. Click **Edit**
5. **Remove any quotes** if present
6. **Remove any leading/trailing spaces**
7. Make sure the value is exactly:
   ```
   mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0
   ```
8. Click **Save**

### Step 3: Redeploy

After updating the environment variable:
1. Go to **Deployments**
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Verify

After redeployment, try logging in again at:
- `https://theta-engineering.vercel.app/admin/login`
- Username: `admin`
- Password: `admin123`

## Common Mistakes

❌ **Wrong:**
```
"mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/?appName=Cluster0"
```
(Quotes around the string, missing database name)

❌ **Wrong:**
```
mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/?appName=Cluster0
```
(Missing database name `/Theta-Engineering`)

✅ **Correct:**
```
mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0
```
(No quotes, includes database name)

## Still Having Issues?

If the error persists:
1. Check Vercel logs for the exact error message
2. Verify the connection string works in MongoDB Compass or another MongoDB client
3. Make sure your MongoDB Atlas IP whitelist allows all IPs (0.0.0.0/0) or includes Vercel's IPs

