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
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-30 pattern-hearts" />
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#E62129]/10 to-[#FF6B35]/10 border border-[#E62129]/20">
              <Heart className="w-4 h-4 text-[#E62129]" fill="#E62129" />
              <span className="text-sm font-medium text-[#E62129]">
                Более 10 лет помощи
              </span>
            </div>

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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/5] gradient-healthcare p-8 pattern-hearts">
                <div className="h-full flex flex-col justify-between text-white">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                      <Heart className="w-8 h-8" fill="white" />
                    </div>
                    <h3 className="font-display text-4xl font-bold leading-tight">
                      ЗДРАВО<br />ОХРА<br />НЕНИЕ
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium opacity-80">Подробнее</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl overflow-hidden shadow-xl transform rotate-[4deg] hover:rotate-0 transition-transform duration-500">
              <div className="aspect-square w-40 gradient-education p-4">
                <div className="h-full flex flex-col justify-center items-center text-white text-center">
                  <span className="text-3xl mb-2">📚</span>
                  <span className="font-display text-sm font-bold">ОБРАЗОВАНИЕ</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 rounded-2xl overflow-hidden shadow-xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
              <div className="aspect-square w-36 gradient-ecology p-4">
                <div className="h-full flex flex-col justify-center items-center text-white text-center">
                  <span className="text-3xl mb-2">🌱</span>
                  <span className="font-display text-sm font-bold">ЭКОЛОГИЯ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center text-muted-foreground hover:text-[#E62129] transition-colors"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Далее</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-current animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;
