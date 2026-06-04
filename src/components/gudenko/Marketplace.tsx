"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { ShoppingBag, Heart, Sparkles } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDesc: string | null;
  price: number;
  mainImage: string;
  rating: number;
  reviewsCount: number;
  inStock: number;
  isFeatured: boolean;
  isNew: boolean;
  category: {
    name: string;
    slug: string;
  };
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

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category.slug === activeCategory)
    : products;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7CDA28]/10 to-[#F7E934]/10 border border-[#7CDA28]/20 mb-6">
            <ShoppingBag className="w-4 h-4 text-[#7CDA28]" />
            <span className="text-sm font-medium text-[#7CDA28]">100% в благотворительность</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Магазин добра
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Игрушки ручной работы, созданные с любовью. Каждый покупатель становится частью большого доброго дела.
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
            <div
              key={product.id}
              className={cn(
                isVisible ? "animate-scale-in" : "opacity-0"
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                description={product.shortDesc || ""}
                price={product.price}
                image={product.mainImage}
                rating={product.rating}
                reviewsCount={product.reviewsCount}
                category={product.category.name}
                inStock={product.inStock}
                isNew={product.isNew}
              />
            </div>
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

        {/* View All Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-10">
            <a
              href="#shop-all"
              className={cn(
                "inline-flex items-center gap-2",
                "px-8 py-4 rounded-full",
                "bg-foreground text-white font-semibold",
                "hover:bg-foreground/80 hover:scale-105",
                "transition-all duration-300"
              )}
            >
              Показать все игрушки
              <ShoppingBag className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default Marketplace;
