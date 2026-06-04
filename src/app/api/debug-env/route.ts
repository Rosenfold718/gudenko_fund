import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    TURSO_URL: process.env.TURSO_URL ? 'SET' : 'UNDEFINED',
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ? 'SET' : 'UNDEFINED',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'UNDEFINED',
    NODE_ENV: process.env.NODE_ENV,
  })
}
