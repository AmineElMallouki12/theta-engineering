/**
 * Script to initialize the admin user
 * Run this with: node scripts/init-admin.js
 * 
 * Make sure to set your MONGODB_URI in .env.local first
 */

require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  console.log('Theta Engineering - Admin User Setup\n')

  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI not found in .env.local')
    console.error('Please create .env.local file with MONGODB_URI')
    process.exit(1)
  }

  const username = await question('Enter admin username: ')
  const password = await question('Enter admin password: ')

  if (!username || !password) {
    console.error('❌ Username and password are required')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters')
    process.exit(1)
  }

  let client
  try {
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db()

    // Check if admin already exists
    const existingAdmin = await db.collection('admins').findOne({ username })
    if (existingAdmin) {
      console.error('\n❌ Admin with this username already exists')
      process.exit(1)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin
    const admin = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection('admins').insertOne(admin)

    console.log('\n✅ Admin user created successfully!')
    console.log(`Username: ${username}`)
    console.log('\nYou can now login at: http://localhost:3000/admin/login')
  } catch (error) {
    if (error.code === 11000) {
      console.error('\n❌ Admin with this username already exists')
    } else {
      console.error('\n❌ Error creating admin:', error.message)
      console.error(error)
    }
    process.exit(1)
  } finally {
    if (client) {
      await client.close()
    }
    rl.close()
  }
}

main()

