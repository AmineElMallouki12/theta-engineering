# Theta Engineering Website

Professional engineering services website with multilingual support (Dutch/English), admin panel, and project portfolio management.

## Features

- 🌍 Multilingual support (Dutch + English)
- 📱 Responsive, modern, minimalistic design
- 🔐 Admin authentication system
- 📋 Quote management with notifications and archive
- 🖼️ Project portfolio management
- 📧 Contact forms with email integration
- 🔒 GDPR compliant
- 🚀 SEO optimized

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Authentication**: JWT + bcrypt
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM=your_email@domain.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # Multilingual routes
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/             # React components
├── lib/                   # Utilities and configurations
├── public/                # Static assets
└── messages/              # Translation files
```

## Documentation

For developers working on this project:

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Comprehensive guide covering architecture, key concepts, common tasks, and troubleshooting
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Coding standards, best practices, and contribution guidelines
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Feature overview and project summary

## Admin Access

**Quick Setup with MongoDB Compass:**

1. Open MongoDB Compass and connect to your database
2. Create a collection called `admins` in your database
3. Insert a document with:
   - `email`: Your admin email
   - `password`: A bcrypt hash of your password (use https://bcrypt-generator.com/ with rounds: 10)
   - `createdAt`: Current date
   - `updatedAt`: Current date

**Example:**
```json
{
  "email": "admin@theta-engineering.com",
  "password": "$2a$10$...your-bcrypt-hash...",
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

After creating the admin, you can login at `/admin/login`

**Alternative:** Use `npm run init-admin` for automated setup

## License

Proprietary - Theta Engineering

