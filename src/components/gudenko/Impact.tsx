"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Heart, Users, Calendar, Award, MapPin } from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
  icon: string | null;
}

interface ImpactProps {
  stats: Stat[];
}

const iconMap: Record<string, React.ElementType> = {
  "heart": Heart,
  "users": Users,
  "calendar": Calendar,
  "award": Award,
  "map-pin": MapPin,
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string | null }) {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const stepValue = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("ru-RU")}{suffix || ""}
    </span>
  );
}

export function Impact({ stats }: ImpactProps) {
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

  // Default stats if none from DB
  const displayStats = stats.length > 0 ? stats : [
    { id: "1", label: "Семей поддержано", value: 847, suffix: null, icon: "users" },
    { id: "2", label: "Лет работы", value: 10, suffix: "+", icon: "calendar" },
    { id: "3", label: "Регионов", value: 15, suffix: null, icon: "map-pin" },
    { id: "4", label: "Проектов", value: 25, suffix: null, icon: "award" },
    { id: "5", label: "Волонтёров", value: 200, suffix: "+", icon: "heart" },
  ];

  // Gradient colors for each stat
  const gradients = [
    "from-[#E62129] to-[#F15A29]",
    "from-[#3A5FCD] to-[#5A7FDD]",
    "from-[#7CDA28] to-[#F7E934]",
    "from-[#3A539B] to-[#6BB6FF]",
    "from-[#E62828] to-[#FF6B35]",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white"
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
            Результаты работы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Цифры, за которыми стоят реальные истории людей
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {displayStats.map((stat, index) => {
            const Icon = (stat.icon && iconMap[stat.icon]) || Heart;
            const gradient = gradients[index % gradients.length];
            
            return (
              <div
                key={stat.id}
                className={cn(
                  "group relative p-6 rounded-2xl overflow-hidden",
                  "bg-white border border-gray-100",
                  "hover:shadow-xl hover:-translate-y-1",
                  "transition-all duration-300",
                  isVisible ? "animate-scale-in" : "opacity-0"
                )}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Gradient accent */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                  gradient
                )} />
                
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  "bg-gradient-to-br",
                  gradient,
                  "text-white"
                )}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Value */}
                <div className="font-display text-3xl font-bold text-foreground mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Impact;
