import { db } from "@/lib/db";
import {
  Header,
  Hero,
  Heritage,
  Marketplace,
  Pillars,
  Impact,
  Stories,
  CTASections,
  Footer,
} from "@/components/gudenko";

// Fetch data directly from database (server-side)
async function getData() {
  try {
    const [products, categories, pillars, stats, stories] = await Promise.all([
      db.product.findMany({
        where: { isActive: true },
        include: {
          category: {
            select: { id: true, name: true, slug: true, icon: true },
          },
        },
        orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
        take: 8,
      }),
      db.category.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
      db.pillar.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }),
      db.impactStat.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }),
      db.story.findMany({
        where: { isPublished: true },
        orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
        take: 4,
      }),
    ]);

    // Transform products - parse images JSON
    const transformedProducts = products.map((product) => ({
      ...product,
      images: JSON.parse(product.images),
    }));

    return {
      products: transformedProducts,
      categories,
      pillars,
      stats,
      stories,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      products: [],
      categories: [],
      pillars: [],
      stats: [],
      stories: [],
    };
  }
}

export default async function HomePage() {
  const { products, categories, pillars, stats, stories } = await getData();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
      <Hero />
      
      {/* About Section */}
      <Heritage />
      
      {/* Pillars / Directions */}
      {pillars.length > 0 && <Pillars pillars={pillars} />}
      
      {/* Marketplace Section */}
      {products.length > 0 && (
        <Marketplace products={products} categories={categories} />
      )}
      
      {/* Impact Stats */}
      {stats.length > 0 && <Impact stats={stats} />}
      
      {/* CTA Sections: Donate, Get Help, Volunteer */}
      <CTASections />
      
      {/* Stories Section */}
      {stories.length > 0 && <Stories stories={stories} />}
      
      <Footer />
    </main>
  );
}
