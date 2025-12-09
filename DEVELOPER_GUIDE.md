# Developer Guide - Theta Engineering Website

This guide helps new developers understand the codebase structure and how to work with it effectively.

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Key Concepts](#key-concepts)
4. [File Structure](#file-structure)
5. [Common Tasks](#common-tasks)
6. [Code Patterns](#code-patterns)
7. [Troubleshooting](#troubleshooting)

## Project Overview

This is a Next.js 14 website with:
- **Multilingual support** (Dutch/English) using `next-intl`
- **Custom admin panel** for content management
- **MongoDB database** for data storage
- **JWT authentication** for admin access
- **TypeScript** for type safety

## Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Auth**: JWT + bcrypt

### Key Libraries

- `next-intl`: Internationalization (i18n)
- `mongodb`: Database driver
- `jsonwebtoken`: Authentication tokens
- `bcryptjs`: Password hashing
- `react-hook-form`: Form management
- `zod`: Schema validation

## Key Concepts

### 1. Internationalization (i18n)

All user-facing text is stored in JSON files:
- `messages/en.json` - English translations
- `messages/nl.json` - Dutch translations

**Usage in components:**
```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('nav')
return <h1>{t('home')}</h1>
```

**Adding new translations:**
1. Add key-value pairs to both `en.json` and `nl.json`
2. Use `t('yourKey')` in components

### 2. Routing Structure

- `app/[locale]/` - Public pages (multilingual)
- `app/admin/` - Admin panel (protected routes)
- `app/api/` - API endpoints

**Locale routing:**
- `/nl/about` - Dutch about page
- `/en/about` - English about page
- Default locale is Dutch (`nl`)

### 3. Authentication Flow

1. Admin logs in at `/admin/login`
2. Server validates credentials
3. JWT token stored in HTTP-only cookie
4. Middleware checks token on protected routes
5. Token expires after 7 days

**Key files:**
- `lib/auth.ts` - Auth utilities
- `lib/middleware-auth.ts` - Auth middleware
- `app/api/auth/` - Auth API routes

### 4. Database Models

All models defined in `lib/models.ts`:
- `Admin` - Admin users
- `Quote` - Contact/quote submissions
- `Project` - Portfolio projects
- `Notification` - Admin notifications

## File Structure

```
├── app/
│   ├── [locale]/          # Public multilingual pages
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── projects/      # Projects listing & detail
│   │   └── contact/       # Contact form
│   ├── admin/             # Admin panel
│   │   ├── login/         # Admin login
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── quotes/        # Quote management
│   │   ├── projects/      # Project management
│   │   └── settings/      # Admin settings
│   └── api/               # API routes
│       ├── auth/          # Authentication endpoints
│       ├── quotes/        # Quote CRUD operations
│       ├── projects/      # Project CRUD operations
│       └── upload/        # File upload endpoint
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Footer component
│   ├── ContactForm.tsx    # Contact/quote form
│   └── ProjectForm.tsx    # Admin project form
├── lib/                   # Utility functions
│   ├── mongodb.ts         # MongoDB connection
│   ├── models.ts          # TypeScript interfaces
│   ├── auth.ts            # Authentication utilities
│   └── middleware-auth.ts # Auth middleware
└── messages/              # Translation files
    ├── en.json            # English translations
    └── nl.json            # Dutch translations
```

## Common Tasks

### Adding a New Page

1. Create page file: `app/[locale]/your-page/page.tsx`
2. Add translations to `messages/en.json` and `messages/nl.json`
3. Add navigation link in `components/Navigation.tsx`

**Example:**
```typescript
// app/[locale]/your-page/page.tsx
import { useTranslations } from 'next-intl'

export default function YourPage() {
  const t = useTranslations('yourPage')
  return <h1>{t('title')}</h1>
}
```

### Adding a New API Endpoint

1. Create route file: `app/api/your-endpoint/route.ts`
2. Export HTTP methods (GET, POST, etc.)
3. Use `requireAuth()` for protected routes

**Example:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware-auth'

export async function GET(request: NextRequest) {
  // Public endpoint
  return NextResponse.json({ data: 'example' })
}

export async function POST(request: NextRequest) {
  await requireAuth(request) // Protected endpoint
  const data = await request.json()
  return NextResponse.json({ success: true })
}
```

### Adding a New Database Model

1. Add interface to `lib/models.ts`
2. Use in API routes and components
3. Collections are created automatically on first insert

**Example:**
```typescript
// lib/models.ts
export interface YourModel {
  _id?: ObjectId
  name: string
  createdAt: Date
}
```

### Modifying Admin Panel

Admin pages are in `app/admin/`:
- All routes are protected by middleware
- Use `AdminLayout` component for consistent layout
- Access admin data via `/api/auth/check`

## Code Patterns

### Form Handling

Uses React Hook Form + Zod:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10)
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

### Database Queries

Always use the shared MongoDB client:

```typescript
import clientPromise from '@/lib/mongodb'
import { Project } from '@/lib/models'

const client = await clientPromise
const db = client.db()
const projects = await db.collection<Project>('projects').find({}).toArray()
```

### Error Handling

API routes should return proper HTTP status codes:

```typescript
try {
  // Your code
  return NextResponse.json({ success: true })
} catch (error) {
  console.error('Error:', error)
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

## Troubleshooting

### Database Connection Issues

- Check `MONGODB_URI` in `.env.local`
- Ensure MongoDB is running
- Verify connection string format

### Authentication Not Working

- Check `JWT_SECRET` in `.env.local`
- Verify cookie settings in browser
- Check token expiration (7 days)

### Translations Not Showing

- Ensure key exists in both `en.json` and `nl.json`
- Check locale parameter in URL
- Verify `useTranslations('namespace')` matches JSON structure

### Build Errors

- Run `npm install` to update dependencies
- Check TypeScript errors: `npm run build`
- Clear `.next` folder and rebuild

## Environment Variables

Required in `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_HOST=your_smtp_host (optional)
SMTP_PORT=587 (optional)
SMTP_USER=your_smtp_user (optional)
SMTP_PASS=your_smtp_password (optional)
SMTP_FROM=your_email@domain.com (optional)
```

## Best Practices

1. **Always use TypeScript types** - Don't use `any`
2. **Validate user input** - Use Zod schemas
3. **Handle errors gracefully** - Return proper HTTP status codes
4. **Keep translations in sync** - Update both `en.json` and `nl.json`
5. **Use environment variables** - Never hardcode secrets
6. **Follow existing patterns** - Maintain consistency

## Getting Help

- Check existing code for examples
- Review `README.md` and `SETUP.md`
- Check Next.js documentation: https://nextjs.org/docs
- Check next-intl documentation: https://next-intl-docs.vercel.app/

