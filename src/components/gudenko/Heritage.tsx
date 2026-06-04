"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Heart, Users, Sparkles } from "lucide-react";

export function Heritage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div
            className={cn(
              "order-2 lg:order-1",
              isVisible ? "animate-fade-in-up" : "opacity-0"
            )}
          >
            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Семья Гуденко —
              <span className="block mt-2 bg-gradient-to-r from-[#E62129] to-[#F15A29] bg-clip-text text-transparent">
                это помощь с душой
              </span>
            </h2>

            {/* Body Text */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы — семейный благотворительный фонд, который помогает людям в трудных жизненных ситуациях. 
                Уже более 10 лет мы поддерживаем семьи по всей России.
              </p>
              
              <p>
                Для нас помощь — это не разовый поступок, а долгосрочные отношения. 
                Мы верим в прозрачность каждого рубля и силу личного примера.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#E62129]/5 to-[#FF6B35]/5 border border-[#E62129]/10">
              <p className="font-display text-lg text-foreground">
                "Настоящее богатство измеряется количеством жизней, которым мы смогли помочь."
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                — Семья Гуденко
              </footer>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#E62129]/10 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-[#E62129]" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">10+</span>
                <p className="text-xs text-muted-foreground mt-1">лет работы</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#3A5FCD]/10 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-[#3A5FCD]" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">847</span>
                <p className="text-xs text-muted-foreground mt-1">семей</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#7CDA28]/10 flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-[#7CDA28]" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">15</span>
                <p className="text-xs text-muted-foreground mt-1">проектов</p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div
            className={cn(
              "order-1 lg:order-2 relative",
              isVisible ? "animate-scale-in delay-200" : "opacity-0"
            )}
          >
            {/* Main Card - About */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#3A5FCD] to-[#5A7FDD] p-8 pattern-people">
                <div className="h-full flex flex-col justify-between text-white">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                      <Heart className="w-8 h-8" fill="white" />
                    </div>
                    <h3 className="font-display text-4xl font-bold leading-tight">
                      О<br />НАС
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>Фонд Гуденко</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl overflow-hidden shadow-lg transform rotate-[-4deg]">
              <div className="aspect-square w-28 bg-gradient-to-br from-[#E62129] to-[#F15A29] p-3">
                <div className="h-full flex flex-col items-center justify-center text-white">
                  <span className="text-3xl">❤️</span>
                  <span className="font-display text-xs font-bold mt-1">С 2012</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 rounded-2xl overflow-hidden shadow-lg transform rotate-[3deg]">
              <div className="aspect-square w-32 bg-gradient-to-br from-[#7CDA28] to-[#F7E934] p-3">
                <div className="h-full flex flex-col items-center justify-center text-foreground">
                  <span className="text-3xl">✨</span>
                  <span className="font-display text-xs font-bold mt-1">ДОВЕРИЕ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Heritage;
