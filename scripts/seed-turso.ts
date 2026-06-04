import { createClient } from '@libsql/client'
import { PrismaClient } from '@prisma/client'

const TURSO_URL = process.env.TURSO_URL!
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!

if (!TURSO_URL || !TURSO_AUTH_TOKEN) {
  console.error('TURSO_URL and TURSO_AUTH_TOKEN must be set')
  process.exit(1)
}

const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_AUTH_TOKEN,
})

const localDb = new PrismaClient()

async function seed() {
  console.log('Fetching data from local database...')
  
  // Get all data from local database
  const categories = await localDb.category.findMany({ orderBy: { sortOrder: 'asc' } })
  const products = await localDb.product.findMany({ orderBy: { sortOrder: 'asc' } })
  const pillars = await localDb.pillar.findMany({ orderBy: { sortOrder: 'asc' } })
  const impactStats = await localDb.impactStat.findMany({ orderBy: { sortOrder: 'asc' } })
  const stories = await localDb.story.findMany()
  
  console.log(`Found: ${categories.length} categories, ${products.length} products, ${pillars.length} pillars, ${impactStats.length} stats, ${stories.length} stories`)
  
  // Seed categories
  console.log('\nSeeding categories...')
  for (const cat of categories) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO categories (id, name, slug, description, icon, image, sortOrder, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [cat.id, cat.name, cat.slug, cat.description, cat.icon, cat.image, cat.sortOrder, cat.createdAt.toISOString(), cat.updatedAt.toISOString()]
    })
    console.log(`✓ Category: ${cat.name}`)
  }
  
  // Seed products
  console.log('\nSeeding products...')
  for (const prod of products) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO products (id, name, slug, description, shortDesc, price, comparePrice, images, mainImage, categoryId, inStock, sku, height, width, weight, material, filler, rating, reviewsCount, isActive, isFeatured, isNew, sortOrder, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        prod.id, prod.name, prod.slug, prod.description, prod.shortDesc, prod.price, prod.comparePrice,
        prod.images, prod.mainImage, prod.categoryId, prod.inStock, prod.sku, prod.height, prod.width,
        prod.weight, prod.material, prod.filler, prod.rating, prod.reviewsCount, prod.isActive ? 1 : 0,
        prod.isFeatured ? 1 : 0, prod.isNew ? 1 : 0, prod.sortOrder, prod.createdAt.toISOString(), prod.updatedAt.toISOString()
      ]
    })
    console.log(`✓ Product: ${prod.name}`)
  }
  
  // Seed pillars
  console.log('\nSeeding pillars...')
  for (const pillar of pillars) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO pillars (id, title, slug, description, icon, image, sortOrder, isActive, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [pillar.id, pillar.title, pillar.slug, pillar.description, pillar.icon, pillar.image, pillar.sortOrder, pillar.isActive ? 1 : 0, pillar.createdAt.toISOString(), pillar.updatedAt.toISOString()]
    })
    console.log(`✓ Pillar: ${pillar.title}`)
  }
  
  // Seed impact stats
  console.log('\nSeeding impact stats...')
  for (const stat of impactStats) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO impact_stats (id, label, value, suffix, icon, sortOrder, isActive, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [stat.id, stat.label, stat.value, stat.suffix, stat.icon, stat.sortOrder, stat.isActive ? 1 : 0, stat.createdAt.toISOString(), stat.updatedAt.toISOString()]
    })
    console.log(`✓ Stat: ${stat.label}`)
  }
  
  // Seed stories
  console.log('\nSeeding stories...')
  for (const story of stories) {
    await turso.execute({
      sql: `INSERT OR REPLACE INTO stories (id, title, slug, excerpt, content, image, images, personName, personAge, location, category, isPublished, isFeatured, publishedAt, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        story.id, story.title, story.slug, story.excerpt, story.content, story.image, story.images,
        story.personName, story.personAge, story.location, story.category, story.isPublished ? 1 : 0,
        story.isFeatured ? 1 : 0, story.publishedAt?.toISOString() || null, story.createdAt.toISOString(), story.updatedAt.toISOString()
      ]
    })
    console.log(`✓ Story: ${story.title}`)
  }
  
  console.log('\n✅ Seeding complete!')
  
  // Verify data
  const catCount = await turso.execute('SELECT COUNT(*) as count FROM categories')
  const prodCount = await turso.execute('SELECT COUNT(*) as count FROM products')
  console.log(`\nVerification: ${catCount.rows[0].count} categories, ${prodCount.rows[0].count} products in Turso`)
  
  await localDb.$disconnect()
}

seed().catch(console.error)
