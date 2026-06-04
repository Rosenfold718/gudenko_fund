import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const isNew = searchParams.get('new');
    const limit = searchParams.get('limit');

    const where = {
      isActive: true,
      ...(category && { category: { slug: category } }),
      ...(featured === 'true' && { isFeatured: true }),
      ...(isNew === 'true' && { isNew: true }),
    };

    const products = await db.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      ...(limit && { take: parseInt(limit, 10) }),
    });

    // Transform images from JSON string to array
    const transformedProducts = products.map((product) => ({
      ...product,
      images: JSON.parse(product.images),
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
