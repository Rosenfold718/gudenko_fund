"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E62129]/10 to-[#FF6B35]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#3A5FCD]/10 to-[#6BB6FF]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#7CDA28]/5 to-[#F7E934]/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <div
            className={cn(
              "space-y-8",
              isVisible ? "animate-fade-in-up" : "opacity-0"
            )}
          >
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
              Помогаем вместе —
              <span className="block mt-2 bg-gradient-to-r from-[#E62129] to-[#F15A29] bg-clip-text text-transparent">
                меняем жизни
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Семейный благотворительный фонд, который поддерживает людей в трудных жизненных ситуациях. 
              Здравоохранение, образование, экология — вместе мы создаём будущее.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#donate"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-8 py-4 rounded-full",
                  "bg-gradient-to-r from-[#E62129] to-[#F15A29]",
                  "text-white font-semibold",
                  "hover:shadow-xl hover:shadow-red-500/25 hover:scale-105",
                  "transition-all duration-300"
                )}
              >
                <Heart className="w-5 h-5" fill="white" />
                Пожертвовать
              </a>
              
              <a
                href="#shop"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-8 py-4 rounded-full",
                  "bg-gradient-to-r from-[#7CDA28] to-[#F7E934]",
                  "text-foreground font-semibold",
                  "hover:shadow-xl hover:shadow-green-500/25 hover:scale-105",
                  "transition-all duration-300"
                )}
              >
                <ShoppingBag className="w-5 h-5" />
                Магазин игрушек
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="font-display text-3xl font-bold text-foreground">847+</div>
                <div className="text-sm text-muted-foreground">семей поддержано</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">лет работы</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">направления</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Cards */}
          <div
            className={cn(
              "relative",
              isVisible ? "animate-scale-in delay-200" : "opacity-0"
            )}
          >
            {/* Main Card - Healthcare */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="/images/healthcare.jpg" 
                alt="Здравоохранение"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-3xl font-bold mb-2">
                  ЗДРАВООХРАНЕНИЕ
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Помогаем получать качественную медицинскую помощь
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>Подробнее</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-8 -left-8 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="/images/education.jpg" 
                alt="Образование"
                className="w-48 h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <span className="font-display text-sm font-bold">ОБРАЗОВАНИЕ</span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="/images/ecology.jpg" 
                alt="Экология"
                className="w-44 h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <span className="font-display text-sm font-bold">ЭКОЛОГИЯ</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

export default Hero;
