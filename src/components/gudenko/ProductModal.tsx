"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  ExternalLink, 
  Heart, 
  Minus, 
  Plus, 
  Star, 
  Truck,
  ShieldCheck,
  Gift
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
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

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentUrl?: string;
}

export function ProductModal({ product, open, onOpenChange, paymentUrl }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (open) {
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [open]);

  if (!product) return null;

  const images = product.images?.length > 0 
    ? product.images 
    : product.mainImage 
      ? [product.mainImage] 
      : ["/images/placeholder.png"];
  const priceInRubles = product.price / 100;
  const comparePriceInRubles = product.comparePrice ? product.comparePrice / 100 : null;
  const discount = comparePriceInRubles 
    ? Math.round((1 - priceInRubles / comparePriceInRubles) * 100) 
    : null;

  const handleBuy = () => {
    const finalAmount = product.price * quantity;
    const finalAmountInKopecks = finalAmount;
    
    if (paymentUrl) {
      window.open(`${paymentUrl}?amount=${finalAmountInKopecks}`, "_blank");
    } else {
      window.open(`https://pay.alfabank.ru/sc/TlAcSjgTsdGPAPUI?amount=${finalAmountInKopecks}`, "_blank");
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  -{discount}%
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute top-4 right-4 bg-green-500">
                  Новинка
                </Badge>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {product.category.icon && <span>{product.category.icon}</span>}
                <span>{product.category.name}</span>
              </div>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription className="sr-only">
                Детальная информация о товаре {product.name}
              </DialogDescription>
            </DialogHeader>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating!)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewsCount || 0} отзывов)
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {priceInRubles.toLocaleString("ru-RU")} ₽
              </span>
              {comparePriceInRubles && (
                <span className="text-xl text-muted-foreground line-through">
                  {comparePriceInRubles.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </div>

            {product.shortDesc && (
              <p className="text-muted-foreground">{product.shortDesc}</p>
            )}

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Количество:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.inStock !== null && quantity >= product.inStock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {product.inStock !== null && (
              <div className={cn(
                "text-sm",
                product.inStock > 0 ? "text-green-600" : "text-red-600"
              )}>
                {product.inStock > 0 
                  ? `В наличии: ${product.inStock} шт.` 
                  : "Нет в наличии"}
              </div>
            )}

            <Button
              onClick={handleBuy}
              disabled={product.inStock !== null && product.inStock <= 0}
              className="w-full bg-gradient-to-r from-[#E62129] to-[#F15A29] hover:opacity-90 text-white py-6 text-lg"
            >
              Купить за {(priceInRubles * quantity).toLocaleString("ru-RU")} ₽
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-red-400" />
                <span>С любовью создан</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Gift className="w-4 h-4 text-primary" />
                <span>Подарочная упаковка</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>100% в благотворительность</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Доставка по России</span>
              </div>
            </div>

            {(product.height || product.material || product.filler) && (
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Характеристики:</h4>
                <dl className="space-y-1 text-sm">
                  {product.height && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Высота:</dt>
                      <dd>{product.height} см</dd>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Материал:</dt>
                      <dd>{product.material}</dd>
                    </div>
                  )}
                  {product.filler && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Наполнитель:</dt>
                      <dd>{product.filler}</dd>
                    </div>
                  )}
                  {product.sku && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Артикул:</dt>
                      <dd>{product.sku}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>

        {product.description && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-2">Описание</h4>
            <div className="text-sm text-muted-foreground whitespace-pre-line">
              {product.description}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
