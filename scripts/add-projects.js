/**
 * Script to add projects to the database
 * Run with: node scripts/add-projects.js
 */

require('dotenv').config({ path: '.env.local' })
const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI is not set in .env.local')
  process.exit(1)
}

const projects = [
  {
    title: {
      en: 'Zinkweg House (1981)',
      nl: 'Woning Zinkweg (1981)'
    },
    description: {
      en: 'Theta Engineering provided complete structural engineering for the renovation of a 1981 house on Zinkweg. The project included replacing the existing floor with a new wooden beam structure and completely removing and replacing the old roof structure with a new roof including additional roof extension.',
      nl: 'Theta Engineering verzorgde de volledige constructieve uitwerking voor de verbouwing van een woning uit 1981 aan de Zinkweg. Het project omvatte de vervanging van de bestaande verdiepingsvloer door een nieuwe houten balklaag. Daarnaast is de oude kapconstructie volledig verwijderd en vervangen door een nieuwe kap met extra dakopbouw.'
    },
    content: {
      en: 'Theta Engineering provided complete structural engineering for the renovation of a 1981 house on Zinkweg. The project included replacing the existing floor with a new wooden beam structure. Additionally, the old roof structure was completely removed and replaced with a new roof including additional roof extension. All necessary structural calculations and checks were performed by Theta Engineering.',
      nl: 'Theta Engineering verzorgde de volledige constructieve uitwerking voor de verbouwing van een woning uit 1981 aan de Zinkweg. Het project omvatte de vervanging van de bestaande verdiepingsvloer door een nieuwe houten balklaag. Daarnaast is de oude kapconstructie volledig verwijderd en vervangen door een nieuwe kap met extra dakopbouw. Alle benodigde constructieve berekeningen en controles zijn door Theta Engineering uitgevoerd.'
    },
    images: [],
    category: 'Renovation',
    client: 'Private',
    year: 2024,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: {
      en: 'Vriezeveenseweg House, Wierden',
      nl: 'Woning Vriezeveenseweg, Wierden'
    },
    description: {
      en: 'On behalf of the residents, Theta Engineering provided structural advice for the extension of an existing house on Vriezeveenseweg in Wierden. The project included a ground floor extension and modification of the roof structure on the first floor.',
      nl: 'In opdracht van de bewoners verzorgde Theta Engineering het constructieve advies voor de uitbreiding van een bestaande woning aan de Vriezeveenseweg in Wierden. Het project omvatte een uitbouw op de begane grond en een aanpassing van de kapconstructie op de eerste verdieping.'
    },
    content: {
      en: 'On behalf of the residents, Theta Engineering provided structural advice for the extension of an existing house on Vriezeveenseweg in Wierden. The project included a ground floor extension and modification of the roof structure on the first floor.',
      nl: 'In opdracht van de bewoners verzorgde Theta Engineering het constructieve advies voor de uitbreiding van een bestaande woning aan de Vriezeveenseweg in Wierden. Het project omvatte een uitbouw op de begane grond en een aanpassing van de kapconstructie op de eerste verdieping.'
    },
    images: [],
    category: 'Extension',
    client: 'Private',
    year: 2024,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function addProjects() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db()
    const collection = db.collection('projects')

    // Check if projects already exist
    for (const project of projects) {
      const existing = await collection.findOne({
        'title.nl': project.title.nl
      })

      if (existing) {
        console.log(`Project "${project.title.nl}" already exists, skipping...`)
      } else {
        const result = await collection.insertOne(project)
        console.log(`Added project: "${project.title.nl}" (ID: ${result.insertedId})`)
      }
    }

    console.log('\nProjects added successfully!')
  } catch (error) {
    console.error('Error adding projects:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('MongoDB connection closed')
  }
}

addProjects()

