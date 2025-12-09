/**
 * Quick script to generate a bcrypt hash for your admin password
 * Run: node scripts/generate-password-hash.js
 */

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
  console.log('Password Hash Generator for MongoDB Compass\n')
  console.log('This will generate a bcrypt hash for your admin password.\n')

  const password = await question('Enter your admin password (min 8 characters): ')

  if (!password || password.length < 8) {
    console.error('\n❌ Password must be at least 8 characters')
    process.exit(1)
  }

  try {
    const hash = await bcrypt.hash(password, 10)
    
    console.log('\n✅ Hash generated successfully!\n')
    console.log('Copy this JSON document and paste it in MongoDB Compass:\n')
    console.log('─'.repeat(60))
    console.log(JSON.stringify({
      email: 'admin@theta-engineering.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }, null, 2))
    console.log('─'.repeat(60))
    console.log('\n📋 Instructions:')
    console.log('1. Open MongoDB Compass')
    console.log('2. Connect to your database')
    console.log('3. Create/select the "admins" collection')
    console.log('4. Click "Insert Document"')
    console.log('5. Paste the JSON above')
    console.log('6. Click "Insert"\n')
    console.log('Then login at: http://localhost:3000/admin/login')
    console.log(`Email: admin@theta-engineering.com`)
    console.log(`Password: ${password}\n`)
  } catch (error) {
    console.error('\n❌ Error generating hash:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()

