import { ObjectId } from 'mongodb'

/**
 * Database model interfaces
 * 
 * These TypeScript interfaces define the structure of documents
 * stored in MongoDB collections. They ensure type safety across
 * the application when working with database data.
 */

/**
 * Admin user model
 * Used for authentication and authorization in the admin panel
 */
export interface Admin {
  _id?: ObjectId
  username: string
  email?: string // Optional for backward compatibility
  password: string // Bcrypt hashed password
  createdAt: Date
  updatedAt: Date
}

/**
 * Quote/Contact submission model
 * Stores form submissions from the contact page
 */
export interface Quote {
  _id?: ObjectId
  name: string
  email: string
  phone?: string // Optional for backward compatibility
  company?: string // Legacy field, kept for backward compatibility
  clientType?: 'organisatie' | 'particulier' // Organization or Private (optional for backward compatibility)
  organizationName?: string // Required if clientType is 'organisatie'
  projectLocation?: string
  projectType?: 'constructief-ontwerp' | 'beoordeling-veiligheid' | 'projectmanagement' | 'inspectie-advies'
  message: string
  documents?: string[] // Array of uploaded document file paths
  privacyAccepted?: boolean // Optional for backward compatibility
  type: 'quote' | 'contact' // Type of submission
  status: 'new' | 'read' | 'archived' // Admin status tracking
  createdAt: Date
  readAt?: Date // When admin marked as read
  archivedAt?: Date // When admin archived
}

/**
 * Project/Portfolio item model
 * Stores project information with bilingual content
 */
export interface Project {
  _id?: ObjectId
  title: { en: string; nl: string } // Bilingual title
  description: { en: string; nl: string } // Bilingual description
  content: { en: string; nl: string } // Bilingual full content
  images: string[] // Array of image file paths
  category?: string // Optional project category
  client?: string // Optional client name
  year?: number // Optional project year
  featured: boolean // Whether to show on homepage
  createdAt: Date
  updatedAt: Date
}

/**
 * Notification model
 * Tracks admin notifications for new quotes/contacts
 */
export interface Notification {
  _id?: ObjectId
  quoteId: ObjectId // Reference to the quote
  type: 'quote' | 'contact' // Type of notification
  read: boolean // Whether admin has seen it
  createdAt: Date
}

