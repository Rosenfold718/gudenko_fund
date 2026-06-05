"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Heart, Users, Sparkles } from "lucide-react";
import { useLocale } from "@/providers/locale-provider";

export function Heritage() {
  const { t } = useLocale();
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
      className="py-20 lg:py-28 bg-background overflow-hidden"
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
              {t("heritage.title1")}
              <span className="block mt-2 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                {t("heritage.title2")}
              </span>
            </h2>

            {/* Body Text */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("heritage.p1")}</p>
              <p>{t("heritage.p2")}</p>
            </div>

            {/* Quote */}
            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="font-display text-lg text-foreground">
                "{t("heritage.quote")}"
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                — {t("heritage.quoteAuthor")}
              </footer>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">10+</span>
                <p className="text-xs text-muted-foreground mt-1">{t("heritage.years")}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">847</span>
                <p className="text-xs text-muted-foreground mt-1">{t("heritage.families")}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-green-500" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">15</span>
                <p className="text-xs text-muted-foreground mt-1">{t("heritage.projects")}</p>
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
            {/* Main Card - Family Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.02]">
              <img 
                src="/images/family.jpg" 
                alt="Семья Гуденко"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-1">
                  Семья Гуденко
                </h3>
                <p className="text-sm text-white/80">
                  {t("heritage.quoteAuthor")}
                </p>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl overflow-hidden shadow-lg transform rotate-[-4deg] transition-transform duration-300 ease-out hover:rotate-0 hover:scale-105">
              <div className="aspect-square w-28 bg-gradient-to-br from-primary to-orange-500 p-3">
                <div className="h-full flex flex-col items-center justify-center text-white">
                  <span className="text-3xl">❤️</span>
                  <span className="font-display text-xs font-bold mt-1">С 2012</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 rounded-2xl overflow-hidden shadow-lg transform rotate-[3deg] transition-transform duration-300 ease-out hover:rotate-0 hover:scale-105">
              <div className="aspect-square w-32 bg-gradient-to-br from-green-500 to-yellow-400 p-3">
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
