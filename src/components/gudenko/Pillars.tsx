"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart, GraduationCap, Leaf, Users, Music } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
}

interface PillarsProps {
  pillars: Pillar[];
}

// Map pillars to gradient colors and icons - supports both Russian and English slugs
const pillarStyles: Record<string, { gradient: string; icon: React.ElementType; pattern: string }> = {
  // Russian slugs
  "zdravookhranenie": {
    gradient: "from-[#E62828] to-[#FF6B35]",
    icon: Heart,
    pattern: "pattern-hearts"
  },
  "obrazovanie": {
    gradient: "from-[#3A539B] to-[#6BB6FF]",
    icon: GraduationCap,
    pattern: "pattern-people"
  },
  "ekologiya": {
    gradient: "from-[#8BC34A] to-[#FFEB3B]",
    icon: Leaf,
    pattern: "pattern-leaves"
  },
  // English slugs (used in database)
  "medicine": {
    gradient: "from-[#E62828] to-[#FF6B35]",
    icon: Heart,
    pattern: "pattern-hearts"
  },
  "education": {
    gradient: "from-[#3A539B] to-[#6BB6FF]",
    icon: GraduationCap,
    pattern: "pattern-people"
  },
  "ecology": {
    gradient: "from-[#8BC34A] to-[#FFEB3B]",
    icon: Leaf,
    pattern: "pattern-leaves"
  },
  "social": {
    gradient: "from-[#E62129] to-[#F15A29]",
    icon: Users,
    pattern: "pattern-people"
  },
  "culture": {
    gradient: "from-[#7CDA28] to-[#F7E934]",
    icon: Music,
    pattern: "pattern-leaves"
  },
};

export function Pillars({ pillars }: PillarsProps) {
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

  // Default pillars if none from DB
  const displayPillars = pillars.length > 0 ? pillars : [
    { id: "1", title: "Здравоохранение", slug: "medicine", description: "Помогаем получить качественную медицинскую помощь, оплачиваем лечение и реабилитацию.", icon: "❤️" },
    { id: "2", title: "Образование", slug: "education", description: "Поддерживаем образовательные программы, помогаем детям и взрослым получать знания.", icon: "📚" },
    { id: "3", title: "Экология", slug: "ecology", description: "Развиваем экологические инициативы, сохраняем природу для будущих поколений.", icon: "🌱" },
  ];

  return (
    <section
      ref={sectionRef}
      id="directions"
      className="py-20 lg:py-28 bg-white"
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
            Наши направления
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Работаем по нескольким ключевым направлениям, чтобы оказывать комплексную помощь
          </p>
        </div>

        {/* Pillars Grid */}
        <div className={cn(
          "grid gap-6 lg:gap-8",
          displayPillars.length <= 3 
            ? "grid-cols-1 md:grid-cols-3" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        )}>
          {displayPillars.map((pillar, index) => {
            const style = pillarStyles[pillar.slug] || pillarStyles["medicine"];
            const Icon = style.icon;
            
            return (
              <a
                key={pillar.id}
                href={`#${pillar.slug}`}
                className={cn(
                  "group relative aspect-[3/4] rounded-3xl overflow-hidden",
                  "bg-gradient-to-br",
                  style.gradient,
                  style.pattern,
                  "hover:shadow-2xl hover:scale-[1.02]",
                  "transition-all duration-500",
                  isVisible ? "animate-scale-in" : "opacity-0"
                )}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between text-white">
                  {/* Top */}
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    {/* Title - Split into lines for visual impact */}
                    <h3 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
                      {pillar.title.split(" ").map((word, i) => (
                        <span key={i} className="block">{word.toUpperCase()}</span>
                      ))}
                    </h3>
                  </div>
                  
                  {/* Bottom */}
                  <div>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                      {pillar.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Подробнее</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pillars;
