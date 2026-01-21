# Fix MongoDB Atlas Connection Error: querySrv ECONNREFUSED

## Error Message
```
Database connection error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.1wbbh8k.mongodb.net
```

## What This Error Means
This error occurs when your computer cannot resolve the DNS for MongoDB Atlas or cannot connect to the MongoDB servers. The most common cause is **IP whitelisting** in MongoDB Atlas.

## Solution Steps

### Step 1: Check Your Current IP Address
Your current public IP address is needed to whitelist it in MongoDB Atlas.

### Step 2: Whitelist Your IP in MongoDB Atlas

1. **Log in to MongoDB Atlas:**
   - Go to https://cloud.mongodb.com/
   - Sign in with your account

2. **Navigate to Network Access:**
   - Click on your project/cluster
   - Go to **Network Access** in the left sidebar
   - Or go directly to: https://cloud.mongodb.com/v2#/security/network/whitelist

3. **Add Your IP Address:**
   - Click **"Add IP Address"** button
   - You have two options:
   
   **Option A: Add Your Current IP (Recommended for Security)**
   - Click **"Add Current IP Address"** button (if available)
   - Or manually enter your IP address
   - Click **"Confirm"**
   
   **Option B: Allow All IPs (For Development Only)**
   - Enter `0.0.0.0/0` in the IP address field
   - Add a comment: "Development - Allow all IPs"
   - Click **"Confirm"**
   - ⚠️ **Warning:** This allows connections from anywhere. Only use for development!

4. **Wait for Changes to Apply:**
   - It may take 1-2 minutes for changes to take effect

### Step 3: Verify Your Connection String

Make sure your `.env.local` file has the correct format:

```env
MONGODB_URI=mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0
```

**Important:**
- ✅ No quotes around the connection string
- ✅ Includes database name: `/Theta-Engineering`
- ✅ No extra spaces
- ✅ Starts with `mongodb+srv://`

### Step 4: Check Windows Firewall

If IP whitelisting doesn't work, check if Windows Firewall is blocking the connection:

1. Open **Windows Defender Firewall**
2. Go to **Advanced Settings**
3. Check **Outbound Rules** for any rules blocking MongoDB connections
4. Temporarily disable firewall to test (remember to re-enable it!)

### Step 5: Check Antivirus/Network

- Some antivirus software blocks MongoDB connections
- Corporate networks or VPNs may block MongoDB Atlas
- Try disconnecting from VPN if you're using one

### Step 6: Restart Your Development Server

After making changes:
1. Stop your dev server (Ctrl+C)
2. Restart it: `npm run dev`
3. Try accessing the admin panel again

## Test Your Connection

You can test if the connection works by visiting:
```
http://localhost:3000/api/auth/test-db
```

This will show you if the MongoDB connection is working.

## Still Having Issues?

If the error persists:

1. **Check MongoDB Atlas Status:**
   - Go to https://status.mongodb.com/
   - Make sure there are no outages

2. **Try Using MongoDB Compass:**
   - Download MongoDB Compass: https://www.mongodb.com/try/download/compass
   - Try connecting with the same connection string
   - If Compass can't connect, the issue is with your network/IP whitelist

3. **Check MongoDB Atlas Logs:**
   - Go to your MongoDB Atlas dashboard
   - Check the **Logs** section for connection attempts
   - Look for any blocked connection messages

4. **Contact Support:**
   - If nothing works, there might be a network/DNS issue
   - Check with your ISP or network administrator

## Quick Fix: Allow All IPs (Development Only)

For quick testing during development, you can temporarily allow all IPs:

1. In MongoDB Atlas Network Access
2. Add IP: `0.0.0.0/0`
3. Comment: "Temporary - Development"
4. Click Confirm

⚠️ **Remember to remove this and add only your IP for production!**
