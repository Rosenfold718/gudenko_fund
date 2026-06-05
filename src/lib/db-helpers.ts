import { db, getTursoClient, isTurso } from './db'
import type { Client } from '@libsql/client'

// Types for our data
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string | null
  price: number
  comparePrice: number | null
  images: string[]
  mainImage: string
  categoryId: string
  inStock: number
  sku: string | null
  height: number | null
  width: number | null
  weight: number | null
  material: string | null
  filler: string | null
  rating: number
  reviewsCount: number
  isActive: boolean
  isFeatured: boolean
  isNew: boolean
  sortOrder: number
  category?: {
    id: string
    name: string
    slug: string
    icon: string | null
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  image: string | null
  sortOrder: number
}

export interface Pillar {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  image: string | null
  sortOrder: number
  isActive: boolean
}

export interface ImpactStat {
  id: string
  label: string
  value: number
  suffix: string | null
  icon: string | null
  sortOrder: number
  isActive: boolean
}

export interface Story {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  images: string | null
  personName: string | null
  personAge: number | null
  location: string | null
  category: string | null
  isPublished: boolean
  isFeatured: boolean
  publishedAt: Date | null
}

// Helper to parse libsql results
function parseProductRow(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    shortDesc: row.shortDesc as string | null,
    price: row.price as number,
    comparePrice: row.comparePrice as number | null,
    images: JSON.parse(row.images as string),
    mainImage: row.mainImage as string,
    categoryId: row.categoryId as string,
    inStock: row.inStock as number,
    sku: row.sku as string | null,
    height: row.height as number | null,
    width: row.width as number | null,
    weight: row.weight as number | null,
    material: row.material as string | null,
    filler: row.filler as string | null,
    rating: row.rating as number,
    reviewsCount: row.reviewsCount as number,
    isActive: row.isActive === 1 || row.isActive === true,
    isFeatured: row.isFeatured === 1 || row.isFeatured === true,
    isNew: row.isNew === 1 || row.isNew === true,
    sortOrder: row.sortOrder as number,
  }
}

// Get products with categories
export async function getProducts(limit = 8): Promise<Product[]> {
  console.log('getProducts called, isTurso:', isTurso())
  if (isTurso()) {
    console.log('Using Turso for products')
    const turso = getTursoClient()!
    const result = await turso.execute({
      sql: `SELECT p.*, c.id as "categoryId", c.name as "categoryName", c.slug as "categorySlug", c.icon as "categoryIcon"
            FROM products p 
            LEFT JOIN categories c ON p.categoryId = c.id
            WHERE p.isActive = 1 
            ORDER BY p.isFeatured DESC, p.sortOrder ASC 
            LIMIT ?`,
      args: [limit]
    })
    
    console.log('Turso products result:', result.rows.length, 'rows')
    return result.rows.map(row => {
      const product = parseProductRow(row)
      product.category = {
        id: row.categoryId as string,
        name: row.categoryName as string,
        slug: row.categorySlug as string,
        icon: row.categoryIcon as string | null,
      }
      return product
    })
  }
  
  // Local Prisma
  console.log('Using local Prisma for products')
  const products = await db.product.findMany({
    where: { isActive: true },
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true } }
    },
    orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
    take: limit,
  })
  
  return products.map(p => ({
    ...p,
    images: JSON.parse(p.images),
  }))
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  if (isTurso()) {
    const turso = getTursoClient()!
    const result = await turso.execute('SELECT * FROM categories ORDER BY sortOrder ASC')
    return result.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      slug: row.slug as string,
      description: row.description as string | null,
      icon: row.icon as string | null,
      image: row.image as string | null,
      sortOrder: row.sortOrder as number,
    }))
  }
  
  return db.category.findMany({ orderBy: { sortOrder: 'asc' } })
}

// Get pillars
export async function getPillars(): Promise<Pillar[]> {
  if (isTurso()) {
    const turso = getTursoClient()!
    const result = await turso.execute('SELECT * FROM pillars WHERE isActive = 1 ORDER BY sortOrder ASC')
    return result.rows.map(row => ({
      id: row.id as string,
      title: row.title as string,
      slug: row.slug as string,
      description: row.description as string,
      icon: row.icon as string,
      image: row.image as string | null,
      sortOrder: row.sortOrder as number,
      isActive: row.isActive === 1 || row.isActive === true,
    }))
  }
  
  return db.pillar.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  })
}

// Get impact stats
export async function getImpactStats(): Promise<ImpactStat[]> {
  if (isTurso()) {
    const turso = getTursoClient()!
    const result = await turso.execute('SELECT * FROM impact_stats WHERE isActive = 1 ORDER BY sortOrder ASC')
    return result.rows.map(row => ({
      id: row.id as string,
      label: row.label as string,
      value: row.value as number,
      suffix: row.suffix as string | null,
      icon: row.icon as string | null,
      sortOrder: row.sortOrder as number,
      isActive: row.isActive === 1 || row.isActive === true,
    }))
  }
  
  return db.impactStat.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  })
}

// Get stories
export async function getStories(limit = 4): Promise<Story[]> {
  if (isTurso()) {
    const turso = getTursoClient()!
    const result = await turso.execute({
      sql: `SELECT * FROM stories WHERE isPublished = 1 ORDER BY isFeatured DESC, publishedAt DESC LIMIT ?`,
      args: [limit]
    })
    return result.rows.map(row => ({
      id: row.id as string,
      title: row.title as string,
      slug: row.slug as string,
      excerpt: row.excerpt as string,
      content: row.content as string,
      image: row.image as string,
      images: row.images as string | null,
      personName: row.personName as string | null,
      personAge: row.personAge as number | null,
      location: row.location as string | null,
      category: row.category as string | null,
      isPublished: row.isPublished === 1 || row.isPublished === true,
      isFeatured: row.isFeatured === 1 || row.isFeatured === true,
      publishedAt: row.publishedAt ? new Date(row.publishedAt as string) : null,
    }))
  }
  
  return db.story.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
    take: limit,
  })
}
