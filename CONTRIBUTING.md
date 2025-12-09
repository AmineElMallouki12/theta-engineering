# Contributing Guide

Thank you for your interest in contributing to the Theta Engineering website! This guide will help you understand our coding standards and workflow.

## 🚀 Getting Started

1. **Read the documentation**
   - Start with `README.md` for setup instructions
   - Review `DEVELOPER_GUIDE.md` for architecture details
   - Check `SETUP.md` for environment configuration

2. **Set up your development environment**
   ```bash
   npm install
   cp .env.example .env.local  # Configure your environment
   npm run dev
   ```

3. **Understand the codebase**
   - Explore the file structure
   - Read existing code to understand patterns
   - Check TypeScript interfaces in `lib/models.ts`

## 📝 Coding Standards

### TypeScript

- **Always use TypeScript** - No JavaScript files
- **Use strict types** - Avoid `any`, use proper interfaces
- **Define interfaces** - Add new types to `lib/models.ts` when needed

**Good:**
```typescript
interface User {
  name: string
  email: string
}

function getUser(id: string): Promise<User | null> {
  // ...
}
```

**Bad:**
```typescript
function getUser(id: any): Promise<any> {
  // ...
}
```

### Code Style

- **Use consistent naming**
  - Components: PascalCase (`ContactForm.tsx`)
  - Functions: camelCase (`getUserData`)
  - Constants: UPPER_SNAKE_CASE (`JWT_SECRET`)
  - Files: match component/function name

- **Format code consistently**
  - Use 2 spaces for indentation
  - Use single quotes for strings (when possible)
  - Add trailing commas in objects/arrays

### Comments

- **Add JSDoc comments** for complex functions:
```typescript
/**
 * Authenticates an admin user and generates a JWT token
 * @param username - Admin username
 * @param password - Plain text password
 * @returns JWT token string or null if authentication fails
 */
export async function authenticateAdmin(
  username: string,
  password: string
): Promise<string | null> {
  // ...
}
```

- **Add inline comments** for non-obvious logic:
```typescript
// Filter out archived quotes for display
const activeQuotes = quotes.filter(q => q.status !== 'archived')
```

- **Don't comment obvious code**:
```typescript
// Bad: This is obvious
const name = user.name

// Good: Explains why
// Use username instead of email for backward compatibility
const username = admin.username || admin.email
```

### Component Structure

Follow this order in React components:

1. Imports
2. Type definitions
3. Component function
4. Hooks (useState, useEffect, etc.)
5. Event handlers
6. Render logic

**Example:**
```typescript
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  title: string
}

export default function MyComponent({ title }: Props) {
  const t = useTranslations('namespace')
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  )
}
```

### API Routes

- **Always handle errors** with try-catch
- **Return proper HTTP status codes**
- **Validate input** using Zod schemas
- **Use requireAuth()** for protected routes

**Example:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

export async function POST(request: NextRequest) {
  try {
    await requireAuth(request)
    
    const body = await request.json()
    const data = schema.parse(body)
    
    // Process data...
    
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Internationalization

- **Always add translations** for new text
- **Update both languages** (en.json and nl.json)
- **Use translation keys** - Never hardcode user-facing text

**Good:**
```typescript
const t = useTranslations('contact')
return <h1>{t('title')}</h1>
```

**Bad:**
```typescript
return <h1>Contact Us</h1> // Hardcoded English text
```

### Database Operations

- **Use TypeScript interfaces** from `lib/models.ts`
- **Handle errors** properly
- **Use the shared client** from `lib/mongodb.ts`

**Example:**
```typescript
import clientPromise from '@/lib/mongodb'
import { Project } from '@/lib/models'

const client = await clientPromise
const db = client.db()

try {
  const projects = await db
    .collection<Project>('projects')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()
  
  return projects
} catch (error) {
  console.error('Database error:', error)
  throw new Error('Failed to fetch projects')
}
```

## 🧪 Testing Guidelines

While automated tests are not yet implemented, follow these practices:

1. **Test manually** before submitting changes
2. **Test in both languages** (Dutch and English)
3. **Test on mobile** - Ensure responsive design works
4. **Test admin features** - Verify authentication works
5. **Test form validation** - Ensure error messages appear

## 📦 File Organization

- **Keep files focused** - One component per file
- **Group related files** - Keep API routes together
- **Use descriptive names** - File names should indicate purpose
- **Follow Next.js conventions** - Use App Router structure

## 🔒 Security

- **Never commit secrets** - Use environment variables
- **Validate all input** - Use Zod schemas
- **Sanitize user data** - Prevent XSS attacks
- **Use parameterized queries** - MongoDB handles this, but be careful
- **Check authentication** - Use `requireAuth()` for protected routes

## 📋 Commit Messages

Use clear, descriptive commit messages:

**Good:**
```
Add username change functionality to admin settings
Fix filter counts on quotes page after archiving
Improve mobile responsiveness of footer component
```

**Bad:**
```
Update code
Fix bug
Changes
```

## 🐛 Reporting Issues

When reporting issues, include:
- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information (if relevant)
- Screenshots (if applicable)

## ✅ Before Submitting

- [ ] Code follows TypeScript best practices
- [ ] All translations added (en.json and nl.json)
- [ ] Error handling implemented
- [ ] Tested in both languages
- [ ] Tested on mobile devices
- [ ] No console errors
- [ ] No TypeScript errors (`npm run build`)
- [ ] Code is properly commented
- [ ] Follows existing code patterns

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🤝 Questions?

If you have questions about contributing:
1. Check `DEVELOPER_GUIDE.md` for detailed explanations
2. Review existing code for examples
3. Check the documentation files (README.md, SETUP.md)

Thank you for contributing! 🎉

