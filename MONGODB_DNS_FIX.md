# Fix MongoDB Atlas DNS Error: querySrv ECONNREFUSED

## What I've Done

I've updated `lib/mongodb.ts` to use reliable DNS servers (Google and Cloudflare) which should fix the DNS resolution issue.

**Restart your dev server** for the changes to take effect:
```cmd
npm run dev
```

## If It Still Doesn't Work - Alternative Solutions

### Option 1: Use Non-SRV Connection String (Most Reliable)

If DNS is still failing, use a direct connection string instead of SRV:

1. **Go to MongoDB Atlas:**
   - Log in at https://cloud.mongodb.com/
   - Click on your cluster
   - Click **"Connect"**

2. **Get Standard Connection String:**
   - Click **"Connect your application"**
   - Select **"Show all connection string options"**
   - Choose **"Standard (non-SRV)"** instead of "Standard (SRV)"
   - Copy the connection string

3. **Update `.env.local`:**
   - Replace your `MONGODB_URI` with the non-SRV version
   - It will look like:
     ```
     mongodb://AmineElMallouki12:Haloumai23@cluster0-shard-00-00.1wbbh8k.mongodb.net:27017,cluster0-shard-00-01.1wbbh8k.mongodb.net:27017,cluster0-shard-00-02.1wbbh8k.mongodb.net:27017/Theta-Engineering?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
     ```

4. **Restart your dev server**

### Option 2: Check Your Network/Firewall

1. **Check Windows Firewall:**
   - Open Windows Defender Firewall
   - Check if it's blocking Node.js or MongoDB connections
   - Temporarily disable to test (remember to re-enable!)

2. **Check Antivirus:**
   - Some antivirus software blocks MongoDB connections
   - Temporarily disable to test

3. **Check VPN/Network:**
   - If you're on a corporate network or VPN, it might block MongoDB
   - Try disconnecting from VPN
   - Try using mobile hotspot to test

### Option 3: Verify IP Whitelist in MongoDB Atlas

1. Go to MongoDB Atlas → **Network Access**
2. Make sure your IP (`41.140.230.76`) is whitelisted
3. Or temporarily add `0.0.0.0/0` (allows all IPs - for development only)
4. Wait 1-2 minutes for changes to apply

### Option 4: Test Connection with MongoDB Compass

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Try connecting with your connection string
3. If Compass can't connect, the issue is network/IP whitelist
4. If Compass CAN connect, the issue is with your Node.js setup

### Option 5: Check Your Connection String Format

Make sure your `.env.local` has:
```env
MONGODB_URI=mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0
```

**Important:**
- ✅ No quotes
- ✅ No extra spaces
- ✅ Includes `/Theta-Engineering` (database name)
- ✅ Password might need URL encoding if it has special characters

## Test Your Connection

After making changes, test the connection:
```
http://localhost:3000/api/auth/test-db
```

This will show you if MongoDB is connected.

## Still Having Issues?

If nothing works:
1. The DNS fix I added should help - make sure you restarted the server
2. Try the non-SRV connection string (Option 1) - this is the most reliable
3. Check if you can access MongoDB Atlas dashboard - if not, there might be a network issue
4. Try from a different network (mobile hotspot) to see if it's your network
