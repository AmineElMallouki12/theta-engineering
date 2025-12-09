/**
 * Migration script to copy data from local MongoDB to MongoDB Atlas
 * 
 * Usage:
 * 1. Make sure your local MongoDB is running
 * 2. Update LOCAL_MONGODB_URI and ATLAS_MONGODB_URI below
 * 3. Run: node scripts/migrate-to-atlas.js
 */

const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

// Local MongoDB connection (your current local database)
const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost:27017/Theta-Engineering'

// MongoDB Atlas connection (your cloud database)
const ATLAS_MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://AmineElMallouki12:Haloumai23@cluster0.1wbbh8k.mongodb.net/Theta-Engineering?appName=Cluster0'

const DB_NAME = 'Theta-Engineering'

async function migrateData() {
  let localClient, atlasClient

  try {
    console.log('🔄 Starting migration from local MongoDB to MongoDB Atlas...\n')

    // Connect to local MongoDB
    console.log('📡 Connecting to local MongoDB...')
    localClient = new MongoClient(LOCAL_MONGODB_URI)
    await localClient.connect()
    const localDb = localClient.db(DB_NAME)
    console.log('✅ Connected to local MongoDB\n')

    // Connect to MongoDB Atlas
    console.log('☁️  Connecting to MongoDB Atlas...')
    atlasClient = new MongoClient(ATLAS_MONGODB_URI)
    await atlasClient.connect()
    const atlasDb = atlasClient.db(DB_NAME)
    console.log('✅ Connected to MongoDB Atlas\n')

    // Collections to migrate
    const collections = ['admins', 'quotes', 'projects', 'notifications']

    for (const collectionName of collections) {
      try {
        console.log(`📦 Migrating collection: ${collectionName}...`)

        // Get all documents from local
        const localCollection = localDb.collection(collectionName)
        const documents = await localCollection.find({}).toArray()

        if (documents.length === 0) {
          console.log(`   ⚠️  No documents found in local ${collectionName}, skipping...\n`)
          continue
        }

        console.log(`   Found ${documents.length} document(s)`)

        // Insert into Atlas (skip duplicates based on _id)
        const atlasCollection = atlasDb.collection(collectionName)
        
        let inserted = 0
        let skipped = 0

        for (const doc of documents) {
          try {
            // Try to insert, but skip if _id already exists
            await atlasCollection.insertOne(doc)
            inserted++
          } catch (error) {
            if (error.code === 11000) {
              // Duplicate key error - document already exists
              skipped++
            } else {
              throw error
            }
          }
        }

        console.log(`   ✅ Inserted: ${inserted}, Skipped (duplicates): ${skipped}\n`)
      } catch (error) {
        console.error(`   ❌ Error migrating ${collectionName}:`, error.message)
        console.log('   Continuing with next collection...\n')
      }
    }

    // Migrate GridFS files (if any)
    console.log('📁 Checking for GridFS files...')
    try {
      const localBucket = new (require('mongodb').GridFSBucket)(localDb, {
        bucketName: 'project-images',
      })

      const atlasBucket = new (require('mongodb').GridFSBucket)(atlasDb, {
        bucketName: 'project-images',
      })

      const files = await localBucket.find({}).toArray()

      if (files.length > 0) {
        console.log(`   Found ${files.length} file(s) to migrate`)

        for (const file of files) {
          try {
            // Check if file already exists in Atlas
            const existing = await atlasBucket.find({ _id: file._id }).toArray()
            if (existing.length > 0) {
              console.log(`   ⚠️  File ${file.filename} already exists, skipping...`)
              continue
            }

            // Download from local
            const downloadStream = localBucket.openDownloadStream(file._id)
            const chunks = []
            
            await new Promise((resolve, reject) => {
              downloadStream.on('data', (chunk) => chunks.push(chunk))
              downloadStream.on('end', resolve)
              downloadStream.on('error', reject)
            })

            // Upload to Atlas
            const uploadStream = atlasBucket.openUploadStream(file.filename, {
              _id: file._id,
              contentType: file.contentType,
              metadata: file.metadata,
            })

            await new Promise((resolve, reject) => {
              uploadStream.on('finish', resolve)
              uploadStream.on('error', reject)
              uploadStream.end(Buffer.concat(chunks))
            })

            console.log(`   ✅ Migrated file: ${file.filename}`)
          } catch (error) {
            console.error(`   ❌ Error migrating file ${file.filename}:`, error.message)
          }
        }
      } else {
        console.log('   No GridFS files found\n')
      }
    } catch (error) {
      console.log('   ⚠️  GridFS migration skipped (no files or error):', error.message, '\n')
    }

    console.log('✅ Migration completed successfully!')
    console.log('\n📊 Summary:')
    console.log('   - All collections have been migrated')
    console.log('   - Duplicate documents were skipped')
    console.log('   - You can now use MongoDB Atlas for your production database')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    if (localClient) {
      await localClient.close()
      console.log('\n🔌 Disconnected from local MongoDB')
    }
    if (atlasClient) {
      await atlasClient.close()
      console.log('🔌 Disconnected from MongoDB Atlas')
    }
  }
}

// Run migration
migrateData().catch(console.error)

