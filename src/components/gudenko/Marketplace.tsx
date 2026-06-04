"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { ShoppingBag, Heart, Sparkles, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDesc: string | null;
  price: number;
  comparePrice: number | null;
  mainImage: string | null;
  images: string[];
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  };
  inStock: number | null;
  sku: string | null;
  height: number | null;
  width: number | null;
  weight: number | null;
  material: string | null;
  filler: string | null;
  rating: number | null;
  reviewsCount: number | null;
  isNew: boolean;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

interface MarketplaceProps {
  products: Product[];
  categories: Category[];
}

export function Marketplace({ products, categories }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.name);
    setSelectedProduct(product);
    setModalOpen(true);
    console.log('Modal should be open');
  };

  // Parse images JSON string if needed
  const parsedProducts = products.map(p => ({
    ...p,
    images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
  }));

  const filteredProducts = activeCategory
    ? parsedProducts.filter((p) => p.category.slug === activeCategory)
    : parsedProducts;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="shop"
        className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div
            className={cn(
              "text-center mb-12",
              isVisible ? "animate-fade-in-up" : "opacity-0"
            )}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Магазин Гудиков
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мягкие игрушки Гудики ручной работы. Каждый Гудик — это уникальный персонаж со своим характером и историей.
            </p>
          </div>

          {/* Category Filters */}
          <div
            className={cn(
              "flex flex-wrap justify-center gap-2 mb-10",
              isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            )}
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === null
                  ? "bg-gradient-to-r from-[#7CDA28] to-[#F7E934] text-foreground shadow-md"
                  : "bg-white text-muted-foreground hover:bg-gray-100 border border-gray-200"
              )}
            >
              Все
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === category.slug
                    ? "bg-gradient-to-r from-[#7CDA28] to-[#F7E934] text-foreground shadow-md"
                    : "bg-white text-muted-foreground hover:bg-gray-100 border border-gray-200"
                )}
              >
                {category.icon && <span className="mr-1.5">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                description={product.shortDesc || ""}
                price={product.price}
                image={product.mainImage || "/images/placeholder.png"}
                rating={product.rating || 0}
                reviewsCount={product.reviewsCount || 0}
                category={product.category.name}
                inStock={product.inStock || 0}
                isNew={product.isNew}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg text-muted-foreground">
                В этой категории пока нет товаров
              </p>
            </div>
          )}

          {/* Info Block */}
          <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">100% в благотворительность</h3>
                <p className="text-muted-foreground">
                  Все средства от продажи Гудиков направляются на помощь нуждающимся
                </p>
              </div>
              <a
                href="https://pay.alfabank.ru/sc/TlAcSjgTsdGPAPUI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E62129] to-[#F15A29] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Пожертвовать
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}

export default Marketplace;
