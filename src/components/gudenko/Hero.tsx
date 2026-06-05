"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useLocale } from "@/providers/locale-provider";

export function Hero() {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Small delay for smoother initial animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Decorations - optimized with GPU acceleration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-orange-500/10 blur-3xl"
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/10 to-sky-400/10 blur-3xl"
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-green-400/5 to-yellow-400/5 blur-3xl"
          style={{ willChange: 'transform' }}
        />
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
              {t("hero.title1")}
              <span className="block mt-2 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#donate"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-8 py-4 rounded-full",
                  "bg-gradient-to-r from-primary to-orange-500",
                  "text-white font-semibold",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-xl hover:shadow-red-500/25",
                  "hover:-translate-y-1"
                )}
              >
                <Heart className="w-5 h-5" fill="white" />
                {t("hero.donate")}
              </a>
              
              <a
                href="#shop"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-8 py-4 rounded-full",
                  "bg-gradient-to-r from-green-500 to-yellow-400",
                  "text-foreground font-semibold",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-xl hover:shadow-green-500/25",
                  "hover:-translate-y-1"
                )}
              >
                <ShoppingBag className="w-5 h-5" />
                {t("hero.shop")}
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="font-display text-3xl font-bold text-foreground">847+</div>
                <div className="text-sm text-muted-foreground">{t("hero.families")}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">{t("hero.years")}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">{t("hero.directions")}</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Cards */}
          <div
            className={cn(
              "relative",
              isVisible ? "animate-scale-in delay-300" : "opacity-0"
            )}
          >
            {/* Main Card - Healthcare */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.02]">
              <img 
                src="/images/healthcare.jpg" 
                alt="Здравоохранение"
                className="w-full aspect-[4/5] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-3xl font-bold mb-2">
                  {t("nav.healthcare").toUpperCase()}
                </h3>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>{t("pillars.more")}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-8 -left-8 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 ease-out hover:scale-105">
              <img 
                src="/images/education.jpg" 
                alt={t("nav.education")}
                className="w-48 h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <span className="font-display text-sm font-bold">{t("nav.education").toUpperCase()}</span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 ease-out hover:scale-105">
              <img 
                src="/images/ecology.jpg" 
                alt={t("nav.ecology")}
                className="w-44 h-44 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <span className="font-display text-sm font-bold">{t("nav.ecology").toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
