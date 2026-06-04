import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pillars = await db.pillar.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return NextResponse.json(pillars);
  } catch (error) {
    console.error('Error fetching pillars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pillars' },
      { status: 500 }
    );
  }
}
