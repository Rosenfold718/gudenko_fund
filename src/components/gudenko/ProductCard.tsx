"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, Heart } from "lucide-react";

export interface ProductCardProps {
  id?: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  inStock?: number;
  isNew?: boolean;
  onClick?: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price / 100) + " ₽";
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < fullStars ? "text-[#F7E934]" : "text-gray-200"
          )}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductCard({
  name,
  slug,
  description,
  price,
  image,
  rating = 5,
  reviewsCount,
  category,
  inStock = 1,
  isNew,
  onClick,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <article
      onClick={handleClick}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden",
        "border border-gray-100",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1",
        "cursor-pointer"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-cover",
              "transition-transform duration-500 ease-out",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🧸</span>
          </div>
        )}

        {/* Category Tag */}
        {category && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-foreground">
            {category}
          </span>
        )}

        {/* New Badge */}
        {isNew && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-[#7CDA28] to-[#F7E934] text-foreground px-3 py-1.5 rounded-full text-xs font-bold">
            Новинка
          </span>
        )}

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-3 right-3 flex gap-2",
            "transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <button
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#E62129] hover:text-white transition-colors"
            aria-label="В избранное"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Out of Stock */}
        {inStock === 0 && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-muted-foreground">
              Нет в наличии
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={rating} />
          {reviewsCount !== undefined && reviewsCount > 0 && (
            <span className="text-xs text-muted-foreground">({reviewsCount})</span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-bold text-foreground mb-1 line-clamp-1 group-hover:text-[#E62129] transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-foreground">
            {formatPrice(price)}
          </span>

          <button
            type="button"
            disabled={inStock === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "text-sm font-semibold",
              "transition-all duration-200",
              inStock > 0
                ? "bg-gradient-to-r from-[#7CDA28] to-[#F7E934] text-foreground hover:shadow-lg hover:scale-105"
                : "bg-gray-100 text-muted-foreground cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {inStock > 0 ? "Купить" : "Ожидайте"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
