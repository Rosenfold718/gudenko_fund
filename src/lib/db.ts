import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Use Turso (libsql) if TURSO_URL is set, otherwise use local SQLite
  const tursoUrl = process.env.TURSO_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN
  
  console.log('DB Init - TURSO_URL:', tursoUrl ? 'SET' : 'UNDEFINED')
  console.log('DB Init - TURSO_AUTH_TOKEN:', tursoToken ? 'SET' : 'UNDEFINED')
  
  if (tursoUrl && tursoToken) {
    console.log('Using Turso database:', tursoUrl)
    const libsql = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    })
    const adapter = new PrismaLibSql(libsql)
    return new PrismaClient({ adapter, log: ['query'] })
  }
  
  // Local development with SQLite
  console.log('Using local SQLite database')
  return new PrismaClient({
    log: ['query'],
  })
}

// Lazy initialization - create client only when accessed
let _prisma: PrismaClient | undefined = undefined

export const db = new Proxy<PrismaClient>({} as PrismaClient, {
  get(target, prop) {
    if (!_prisma) {
      _prisma = createPrismaClient()
      if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = _prisma
      }
    }
    return Reflect.get(_prisma, prop, _prisma)
  }
})
