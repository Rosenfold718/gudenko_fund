import { createClient } from '@libsql/client'

const TURSO_URL = process.env.TURSO_URL!
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!

if (!TURSO_URL || !TURSO_AUTH_TOKEN) {
  console.error('TURSO_URL and TURSO_AUTH_TOKEN must be set')
  process.exit(1)
}

const db = createClient({
  url: TURSO_URL,
  authToken: TURSO_AUTH_TOKEN,
})

async function migrate() {
  console.log('Connecting to Turso...')
  
  // Create tables
  const statements = [
    // Categories
    `CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      icon TEXT,
      image TEXT,
      sortOrder INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Products
    `CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      shortDesc TEXT,
      price INTEGER NOT NULL,
      comparePrice INTEGER,
      images TEXT NOT NULL,
      mainImage TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      inStock INTEGER DEFAULT 1,
      sku TEXT UNIQUE,
      height INTEGER,
      width INTEGER,
      weight INTEGER,
      material TEXT,
      filler TEXT,
      rating REAL DEFAULT 0,
      reviewsCount INTEGER DEFAULT 0,
      isActive BOOLEAN DEFAULT 1,
      isFeatured BOOLEAN DEFAULT 0,
      isNew BOOLEAN DEFAULT 0,
      sortOrder INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    )`,
    
    // Reviews
    `CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      rating INTEGER NOT NULL,
      text TEXT,
      author TEXT NOT NULL,
      email TEXT,
      productId TEXT NOT NULL,
      isApproved BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (productId) REFERENCES products(id)
    )`,
    
    // Orders
    `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      orderNumber TEXT NOT NULL UNIQUE,
      status TEXT DEFAULT 'NEW',
      customerName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      deliveryType TEXT NOT NULL,
      address TEXT,
      city TEXT,
      postalCode TEXT,
      comment TEXT,
      subtotal INTEGER NOT NULL,
      deliveryCost INTEGER DEFAULT 0,
      total INTEGER NOT NULL,
      paymentMethod TEXT DEFAULT 'CARD',
      paymentStatus TEXT DEFAULT 'PENDING',
      paymentId TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Order Items
    `CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      orderId TEXT NOT NULL,
      productId TEXT NOT NULL,
      productName TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (productId) REFERENCES products(id)
    )`,
    
    // Stories
    `CREATE TABLE IF NOT EXISTS stories (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT NOT NULL,
      images TEXT,
      personName TEXT,
      personAge INTEGER,
      location TEXT,
      category TEXT,
      isPublished BOOLEAN DEFAULT 0,
      isFeatured BOOLEAN DEFAULT 0,
      publishedAt DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Pillars
    `CREATE TABLE IF NOT EXISTS pillars (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      image TEXT,
      sortOrder INTEGER DEFAULT 0,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Impact Stats
    `CREATE TABLE IF NOT EXISTS impact_stats (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      value INTEGER NOT NULL,
      suffix TEXT,
      icon TEXT,
      sortOrder INTEGER DEFAULT 0,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
  ]
  
  console.log('Creating tables...')
  
  for (const stmt of statements) {
    try {
      await db.execute(stmt)
      console.log('✓ Table created')
    } catch (error) {
      console.error('Error:', error)
    }
  }
  
  console.log('Migration complete!')
  
  // Check tables
  const tables = await db.execute("SELECT name FROM sqlite_master WHERE type='table'")
  console.log('\nExisting tables:', tables.rows.map(r => r.name))
}

migrate().catch(console.error)
