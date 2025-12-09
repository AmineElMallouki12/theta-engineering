# Migrate Data from Local MongoDB to MongoDB Atlas

## Why Migrate?

Your local MongoDB (MongoDB Compass) and MongoDB Atlas are **separate databases**. Data doesn't automatically sync between them. If you created projects, quotes, or admin users locally, they won't appear in Atlas until you migrate them.

## Quick Migration (Recommended)

### Step 1: Make sure your local MongoDB is running

If you're using MongoDB locally, make sure it's running:
- Check MongoDB Compass - it should show "Connected"
- Or check if MongoDB service is running on your computer

### Step 2: Update the migration script

The script will use your existing environment variables, but you can also set them manually:

1. Open `scripts/migrate-to-atlas.js`
2. If needed, update these lines:
   ```javascript
   const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/Theta-Engineering'
   const ATLAS_MONGODB_URI = 'mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0'
   ```

### Step 3: Run the migration

```bash
npm run migrate-to-atlas
```

This will:
- ✅ Copy all collections (admins, quotes, projects, notifications)
- ✅ Copy all GridFS files (images)
- ✅ Skip duplicates (won't overwrite existing data)
- ✅ Show you a summary of what was migrated

## What Gets Migrated?

The script migrates:
- ✅ **admins** - Admin users
- ✅ **quotes** - Contact form submissions
- ✅ **projects** - Project portfolio items
- ✅ **notifications** - Admin notifications
- ✅ **GridFS files** - Project images stored in MongoDB

## Manual Migration (Alternative)

If you prefer to do it manually:

### Option 1: Using MongoDB Compass

1. **Export from Local:**
   - Open MongoDB Compass
   - Connect to your local database
   - Select a collection (e.g., `projects`)
   - Click "Export Collection"
   - Save as JSON file

2. **Import to Atlas:**
   - Open MongoDB Compass
   - Connect to your Atlas cluster
   - Select the database
   - Click "Import Data"
   - Choose the JSON file you exported
   - Import

### Option 2: Using mongodump/mongorestore

```bash
# Export from local
mongodump --uri="mongodb://localhost:27017/Theta-Engineering" --out=./backup

# Import to Atlas
mongorestore --uri="mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0" ./backup/Theta-Engineering
```

## Verify Migration

After migration:

1. **Check MongoDB Atlas:**
   - Go to https://cloud.mongodb.com
   - Navigate to your cluster
   - Click "Browse Collections"
   - Verify your collections and data are there

2. **Check Your Website:**
   - Go to `https://theta-engineering.vercel.app/admin/projects`
   - Your projects should appear
   - Try logging in with your admin credentials

## Troubleshooting

### Error: "Cannot connect to local MongoDB"
- Make sure MongoDB is running locally
- Check the connection string in the script
- Try connecting with MongoDB Compass first

### Error: "Cannot connect to Atlas"
- Verify your Atlas connection string is correct
- Check that your IP is whitelisted in Atlas
- Make sure your password is correct (no special characters need URL encoding)

### Some data didn't migrate
- Check the console output for errors
- The script will continue even if one collection fails
- You can run it multiple times (it skips duplicates)

### Duplicate key errors
- This is normal! The script skips documents that already exist
- If you want to overwrite, you'll need to delete the collection in Atlas first

## After Migration

Once migration is complete:
- ✅ Your local data is now in Atlas
- ✅ Your website will use Atlas data
- ✅ You can continue using Atlas for all new data
- ✅ Local MongoDB is no longer needed (unless you want to keep it for development)

## Need Help?

If you encounter issues:
1. Check the console output for specific error messages
2. Verify both connection strings are correct
3. Make sure both databases are accessible
4. Check that collection names match exactly

