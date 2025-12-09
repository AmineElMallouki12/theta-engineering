/**
 * Test script to verify admin login credentials
 * Run: node scripts/test-login.js
 */

require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

async function testLogin() {
  console.log('=== Testing Admin Login ===\n')

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local')
    process.exit(1)
  }

  const username = 'admin'
  const password = 'admin123'

  let client
  try {
    console.log('1. Connecting to MongoDB...')
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    console.log('   ✅ Connected\n')

    const db = client.db()
    console.log(`2. Using database: ${db.databaseName}\n`)

    console.log(`3. Looking for admin with username: "${username}"...`)
    const admin = await db.collection('admins').findOne({ username })
    
    if (!admin) {
      console.error('   ❌ Admin not found!')
      console.log('\n   Available admins:')
      const allAdmins = await db.collection('admins').find({}).toArray()
      allAdmins.forEach(a => {
        console.log(`   - Username: ${a.username || 'N/A'}, Email: ${a.email || 'N/A'}`)
      })
      process.exit(1)
    }
    console.log('   ✅ Admin found\n')

    console.log('4. Verifying password...')
    const isValid = await bcrypt.compare(password, admin.password)
    
    if (isValid) {
      console.log('   ✅ Password is correct!\n')
      console.log('✅ Login credentials are valid!')
      console.log(`   Username: ${admin.username}`)
      console.log(`   Password: ${password}`)
    } else {
      console.error('   ❌ Password is incorrect!')
      console.log('\n   The password hash in database might be for a different password.')
      console.log('   Try resetting the password:')
      console.log('   node scripts/reset-admin-password.js')
      process.exit(1)
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('authentication')) {
      console.error('\n   MongoDB authentication failed. Check your username/password in the connection string.')
    } else if (error.message.includes('network')) {
      console.error('\n   Network error. Check your MongoDB Atlas network access settings.')
    }
    process.exit(1)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

testLogin()

