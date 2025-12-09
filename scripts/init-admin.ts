/**
 * Script to initialize the admin user
 * Run this with: npx ts-node scripts/init-admin.ts
 */

import { createAdmin } from '../lib/auth'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  console.log('Theta Engineering - Admin User Setup\n')

  const email = await question('Enter admin email: ')
  const password = await question('Enter admin password: ')

  if (!email || !password) {
    console.error('Email and password are required')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters')
    process.exit(1)
  }

  try {
    await createAdmin(email, password)
    console.log('\n✅ Admin user created successfully!')
    console.log(`Email: ${email}`)
  } catch (error: any) {
    if (error.code === 11000) {
      console.error('\n❌ Admin with this email already exists')
    } else {
      console.error('\n❌ Error creating admin:', error.message)
    }
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()

