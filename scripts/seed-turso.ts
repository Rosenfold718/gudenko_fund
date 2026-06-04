// Seed script for Turso database
import { createClient } from '@libsql/client'

const TURSO_URL = process.env.TURSO_URL!
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!

async function main() {
  console.log('🌱 Seeding Turso database...')
  console.log('URL:', TURSO_URL)

  const db = createClient({
    url: TURSO_URL,
    authToken: TURSO_AUTH_TOKEN,
  })

  // Create tables
  console.log('📦 Creating tables...')

  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      image TEXT,
      sortOrder INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
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
      isActive INTEGER DEFAULT 1,
      isFeatured INTEGER DEFAULT 0,
      isNew INTEGER DEFAULT 0,
      sortOrder INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS pillars (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      image TEXT,
      sortOrder INTEGER DEFAULT 0,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS impact_stats (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      value INTEGER NOT NULL,
      suffix TEXT,
      icon TEXT,
      sortOrder INTEGER DEFAULT 0,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS stories (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT NOT NULL,
      images TEXT,
      personName TEXT,
      personAge INTEGER,
      location TEXT,
      category TEXT,
      isPublished INTEGER DEFAULT 0,
      isFeatured INTEGER DEFAULT 0,
      publishedAt TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('✅ Tables created')

  // Insert categories
  console.log('📦 Inserting categories...')

  const categories = [
    { id: 'cat1', name: 'Гудики', slug: 'gudiki-basic', description: 'Мягкие игрушки Гудики — каждый со своим уникальным характером и историей.', icon: '🧸', sortOrder: 1 },
    { id: 'cat2', name: 'Сюрприз-паки', slug: 'surprise-packs', description: 'Наборы Гудиков с сертификатами и подарками.', icon: '🎁', sortOrder: 2 },
    { id: 'cat3', name: 'Лимитированные', slug: 'limited', description: 'Редкие и секретные Гудики.', icon: '⭐', sortOrder: 3 },
  ]

  for (const cat of categories) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO categories (id, name, slug, description, icon, sortOrder) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [cat.id, cat.name, cat.slug, cat.description, cat.icon, cat.sortOrder]
    })
  }
  console.log(`✅ Inserted ${categories.length} categories`)

  // Insert products
  console.log('🧸 Inserting products...')

  const products = [
    {
      id: 'prod1', name: 'Листик', slug: 'gudik-listik',
      description: 'Энергичный и неутомимый Гудик, который хочет спасти мир прямо сейчас!',
      shortDesc: 'Экологический Гудик с ростком на макушке',
      price: 100000, mainImage: '/images/gudiki/listik.png',
      images: '["/images/gudiki/listik.png"]', categoryId: 'cat1',
      inStock: 20, sku: 'GUD-LISTIK-001', height: 15, weight: 150,
      material: 'Фетр зелёный', filler: 'Холофайбер', rating: 4.9, reviewsCount: 28, isFeatured: 1
    },
    {
      id: 'prod2', name: 'Семьяш', slug: 'gudik-semyash',
      description: 'Самый мудрый Гудик. Не говорит — показывает.',
      shortDesc: 'Мудрый Гудик — ядро фонда (редкий)',
      price: 100000, mainImage: '/images/gudiki/semyash.png',
      images: '["/images/gudiki/semyash.png"]', categoryId: 'cat3',
      inStock: 5, sku: 'GUD-SEMYASH-001', height: 15, weight: 160,
      material: 'Фетр бежевый', filler: 'Холофайбер', rating: 5.0, reviewsCount: 12, isFeatured: 1
    },
    {
      id: 'prod3', name: 'Тихоня', slug: 'gudik-tikhonya',
      description: 'Единственный Гудик, который "спит". Глаза закрыты.',
      shortDesc: 'Секретный Гудик со звёздами (1 из 20)',
      price: 150000, mainImage: '/images/gudiki/tikhonya.png',
      images: '["/images/gudiki/tikhonya.png"]', categoryId: 'cat3',
      inStock: 3, sku: 'GUD-TIKHON-001', height: 15, weight: 140,
      material: 'Фетр тёмно-синий', filler: 'Холофайбер', rating: 5.0, reviewsCount: 7, isFeatured: 1
    },
    {
      id: 'prod4', name: 'Шармо', slug: 'gudik-sharmo',
      description: 'Обнимает всех. Не понимает, что такое "чужой".',
      shortDesc: 'Гудик-сердце для равных возможностей',
      price: 100000, mainImage: '/images/gudiki/sharmo.png',
      images: '["/images/gudiki/sharmo.png"]', categoryId: 'cat1',
      inStock: 15, sku: 'GUD-SHARMO-001', height: 14, weight: 130,
      material: 'Фетр коралловый', filler: 'Холофайбер', rating: 4.9, reviewsCount: 21, isFeatured: 1
    },
    {
      id: 'prod5', name: 'Плюшкин', slug: 'gudik-plyushkin',
      description: 'Серьёзный для Гудика. Не шутит про здоровье.',
      shortDesc: 'Гудик-доктор со шприцом и аптечкой',
      price: 100000, mainImage: '/images/gudiki/plyushkin.png',
      images: '["/images/gudiki/plyushkin.png"]', categoryId: 'cat1',
      inStock: 12, sku: 'GUD-PLYUSH-001', height: 15, weight: 150,
      material: 'Фетр мятный', filler: 'Холофайбер', rating: 4.8, reviewsCount: 16, isFeatured: 1
    },
    {
      id: 'prod6', name: 'Книжка', slug: 'gudik-knizhka',
      description: 'Всегда читает, задаёт вопросы, "застревает" в книгах.',
      shortDesc: 'Гудик-книжка для образования',
      price: 100000, mainImage: '/images/gudiki/knizhka.png',
      images: '["/images/gudiki/knizhka.png"]', categoryId: 'cat1',
      inStock: 18, sku: 'GUD-KNIZH-001', height: 14, weight: 140,
      material: 'Фетр голубой', filler: 'Холофайбер', rating: 4.9, reviewsCount: 19, isNew: 1
    },
    {
      id: 'prod7', name: 'Маляр', slug: 'gudik-malyar',
      description: 'Видит красоту там, где другие не видят.',
      shortDesc: 'Гудик-художник с кисточкой',
      price: 100000, mainImage: '/images/gudiki/malyar.png',
      images: '["/images/gudiki/malyar.png"]', categoryId: 'cat1',
      inStock: 14, sku: 'GUD-MALYAR-001', height: 15, weight: 145,
      material: 'Фетр белый', filler: 'Холофайбер', rating: 4.8, reviewsCount: 14, isNew: 1
    },
    {
      id: 'prod8', name: 'Сюрприз-пак «Бронза»', slug: 'pack-bronze',
      description: 'Начните коллекцию Гудиков! 1 сюрприз-пак со случайным Гудиком.',
      shortDesc: '1 сюрприз-пак + сертификат',
      price: 50000, mainImage: '/images/gudiki/pack-bronze.png',
      images: '["/images/gudiki/pack-bronze.png"]', categoryId: 'cat2',
      inStock: 100, sku: 'PACK-BRONZE', rating: 4.7, reviewsCount: 45
    },
    {
      id: 'prod9', name: 'Сюрприз-пак «Серебро»', slug: 'pack-silver',
      description: 'Выберите своего Гудика! Выбор конкретного Гудика из базовой серии.',
      shortDesc: 'Выбор Гудика + сертификат + открытка',
      price: 100000, mainImage: '/images/gudiki/pack-silver.png',
      images: '["/images/gudiki/pack-silver.png"]', categoryId: 'cat2',
      inStock: 50, sku: 'PACK-SILVER', rating: 4.9, reviewsCount: 32, isFeatured: 1
    },
    {
      id: 'prod10', name: 'Сюрприз-пак «Золото»', slug: 'pack-gold',
      description: 'Большой Гудик для обнимашек! Гудик 25 см на выбор.',
      shortDesc: 'Гудик 25 см + сертификат + значок',
      price: 250000, mainImage: '/images/gudiki/pack-gold.png',
      images: '["/images/gudiki/pack-gold.png"]', categoryId: 'cat2',
      inStock: 25, sku: 'PACK-GOLD', rating: 5.0, reviewsCount: 18, isFeatured: 1
    },
    {
      id: 'prod11', name: 'Сюрприз-пак «Платина»', slug: 'pack-platinum',
      description: 'Полная коллекция «Первые»! Все 7 Гудиков серии.',
      shortDesc: 'Весь набор «Первые» (7 шт) + книга сказок',
      price: 1000000, mainImage: '/images/gudiki/pack-platinum.png',
      images: '["/images/gudiki/pack-platinum.png"]', categoryId: 'cat2',
      inStock: 5, sku: 'PACK-PLATINUM', rating: 5.0, reviewsCount: 8
    },
    {
      id: 'prod12', name: 'Сюрприз-пак «Меценат»', slug: 'pack-maecenas',
      description: 'Станьте создателем нового Гудика! Личный Гудик на заказ.',
      shortDesc: 'Личный Гудик на заказ + упоминание как создателя',
      price: 2500000, mainImage: '/images/gudiki/pack-maecenas.png',
      images: '["/images/gudiki/pack-maecenas.png"]', categoryId: 'cat2',
      inStock: 10, sku: 'PACK-MAECENAS', rating: 5.0, reviewsCount: 3
    },
  ]

  for (const prod of products) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO products (id, name, slug, description, shortDesc, price, mainImage, images, categoryId, inStock, sku, height, weight, material, filler, rating, reviewsCount, isFeatured, isNew) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [prod.id, prod.name, prod.slug, prod.description, prod.shortDesc, prod.price, prod.mainImage, prod.images, prod.categoryId, prod.inStock, prod.sku, prod.height || null, prod.weight || null, prod.material || null, prod.filler || null, prod.rating, prod.reviewsCount, prod.isFeatured || 0, prod.isNew || 0]
    })
  }
  console.log(`✅ Inserted ${products.length} products`)

  // Insert pillars
  console.log('🎯 Inserting pillars...')
  const pillars = [
    { id: 'pil1', title: 'Образование', slug: 'education', description: 'Поддержка талантливых студентов и исследователей.', icon: '📚', sortOrder: 1 },
    { id: 'pil2', title: 'Медицина', slug: 'medicine', description: 'Доступ к качественному лечению для нуждающихся.', icon: '🏥', sortOrder: 2 },
    { id: 'pil3', title: 'Социальная поддержка', slug: 'social', description: 'Помощь семьям в трудных жизненных ситуациях.', icon: '🤝', sortOrder: 3 },
    { id: 'pil4', title: 'Культура', slug: 'culture', description: 'Сохранение культурного наследия и поддержка искусства.', icon: '🎭', sortOrder: 4 },
    { id: 'pil5', title: 'Экология', slug: 'ecology', description: 'Защита окружающей среды.', icon: '🌱', sortOrder: 5 },
  ]

  for (const p of pillars) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO pillars (id, title, slug, description, icon, sortOrder) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [p.id, p.title, p.slug, p.description, p.icon, p.sortOrder]
    })
  }
  console.log(`✅ Inserted ${pillars.length} pillars`)

  // Insert stats
  console.log('📊 Inserting stats...')
  const stats = [
    { id: 'stat1', label: 'Семей поддержано', value: 847, icon: '👨‍👩‍👧‍👦', sortOrder: 1 },
    { id: 'stat2', label: 'Гудиков создано', value: 1250, suffix: '+', icon: '🧸', sortOrder: 2 },
    { id: 'stat3', label: 'Направлено на помощь', value: 32, suffix: 'M ₽', icon: '💝', sortOrder: 3 },
  ]

  for (const s of stats) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO impact_stats (id, label, value, suffix, icon, sortOrder) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [s.id, s.label, s.value, s.suffix || null, s.icon, s.sortOrder]
    })
  }
  console.log(`✅ Inserted ${stats.length} stats`)

  // Insert stories
  console.log('📖 Inserting stories...')
  await db.execute({
    sql: `INSERT OR REPLACE INTO stories (id, title, slug, excerpt, content, image, personName, personAge, location, category, isPublished, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['story1', 'Иван: от интерната до университета', 'ivan-story', 'Как образовательная программа фонда помогла талантливому подростку из детского дома поступить в престижный вуз.', 'Ваня вырос в детском доме. В 15 лет он увлёкся программированием, но у него не было компьютера. Фонд обеспечил всем необходимым.', '/images/stories/ivan.jpg', 'Иван С.', 17, 'Санкт-Петербург', 'Образование', 1, 1]
  })
  console.log(`✅ Inserted 1 story`)

  console.log('✅ Seeding completed!')
}

main().catch(console.error)
