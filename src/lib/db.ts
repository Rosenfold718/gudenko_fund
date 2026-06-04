import { PrismaClient } from '@prisma/client'
import { createClient, type Client } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  turso: Client | undefined
}

// Turso client for direct queries
export function getTursoClient(): Client | null {
  const tursoUrl = process.env.TURSO_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN
  
  if (tursoUrl && tursoToken) {
    if (!globalForPrisma.turso) {
      globalForPrisma.turso = createClient({
        url: tursoUrl,
        authToken: tursoToken,
      })
    }
    return globalForPrisma.turso
  }
  return null
}

// Helper to check if we're using Turso
export function isTurso(): boolean {
  return !!(process.env.TURSO_URL && process.env.TURSO_AUTH_TOKEN)
}

// For local SQLite, use Prisma directly
function createPrismaClient(): PrismaClient {
  return new PrismaClient()
}

// Singleton pattern for Prisma client (used for local SQLite)
export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
