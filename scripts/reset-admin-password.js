/**
 * Script to reset admin password to "admin123"
 * Run: node scripts/reset-admin-password.js
 */

require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcryptjs')
const { MongoClient } = require('mongodb')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/theta-engineering'
const NEW_PASSWORD = 'admin123'

async function main() {
  console.log('Admin Password Reset Script\n')
  console.log('This will reset the admin password to: admin123\n')

  let client
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...')
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    console.log('✅ Connected to MongoDB\n')

    // Extract database name from URI or use default
    // Try to get the actual database name from the connection
    let dbName = MONGODB_URI.split('/').pop()?.split('?')[0] || 'theta-engineering'
    
    // List databases to find the correct one (case-sensitive)
    const adminDb = client.db().admin()
    const dbList = await adminDb.listDatabases()
    const existingDb = dbList.databases.find(db => 
      db.name.toLowerCase() === dbName.toLowerCase()
    )
    
    if (existingDb) {
      dbName = existingDb.name
    }
    
    const db = client.db(dbName)
    const adminsCollection = db.collection('admins')
    
    console.log(`Using database: ${dbName}\n`)

    // Hash the new password
    console.log('Hashing new password...')
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10)
    console.log('✅ Password hashed\n')

    // Find admin (assuming there's at least one admin)
    let admin = await adminsCollection.findOne({})
    
    if (!admin) {
      // Create admin if it doesn't exist
      console.log('No admin found. Creating new admin account...')
      const defaultUsername = 'admin'
      
      const newAdmin = {
        username: defaultUsername,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      const insertResult = await adminsCollection.insertOne(newAdmin)
      admin = { ...newAdmin, _id: insertResult.insertedId }
      console.log(`✅ Admin account created with username: ${defaultUsername}\n`)
    } else {
      // Update password for existing admin
      console.log(`Updating password for admin: ${admin.username || admin.email || 'admin'}...`)
      const result = await adminsCollection.updateOne(
        { _id: admin._id },
        {
          $set: {
            password: hashedPassword,
            updatedAt: new Date(),
            // Add username if it doesn't exist (migration)
            ...(admin.username ? {} : { username: admin.email?.split('@')[0] || 'admin' }),
          },
        }
      )

      if (result.modifiedCount > 0) {
        console.log('✅ Password reset successfully!\n')
      } else {
        console.log('⚠️  Password was not updated. It may already be set to this value.\n')
      }
    }

    console.log('─'.repeat(60))
    console.log('Login Credentials:')
    console.log(`Username: ${admin.username || admin.email?.split('@')[0] || 'admin'}`)
    console.log(`Password: ${NEW_PASSWORD}`)
    console.log('─'.repeat(60))
    console.log('\nYou can now login at: http://localhost:3000/admin/login\n')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('MONGODB_URI')) {
      console.error('\nPlease make sure MONGODB_URI is set in your .env.local file')
    }
    process.exit(1)
  } finally {
    if (client) {
      await client.close()
      console.log('Database connection closed.')
    }
  }
}

main()

