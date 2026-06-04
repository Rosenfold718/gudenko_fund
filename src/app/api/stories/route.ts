import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where = {
      isPublished: true,
      ...(featured === 'true' && { isFeatured: true }),
    };

    const stories = await db.story.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { publishedAt: 'desc' },
      ],
      ...(limit && { take: parseInt(limit, 10) }),
    });

    // Transform images from JSON string to array if present
    const transformedStories = stories.map((story) => ({
      ...story,
      images: story.images ? JSON.parse(story.images) : null,
    }));

    return NextResponse.json(transformedStories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}
