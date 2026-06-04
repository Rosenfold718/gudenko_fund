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
import { getProducts, getCategories, getPillars, getImpactStats, getStories } from "@/lib/db-helpers";

// Fetch data directly from database (server-side)
async function getData() {
  try {
    console.log('Fetching data...')
    const [products, categories, pillars, stats, stories] = await Promise.all([
      getProducts(8),
      getCategories(),
      getPillars(),
      getImpactStats(),
      getStories(4),
    ]);

    console.log('Data fetched:', {
      products: products.length,
      categories: categories.length,
      pillars: pillars.length,
      stats: stats.length,
      stories: stories.length
    })

    return {
      products,
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
