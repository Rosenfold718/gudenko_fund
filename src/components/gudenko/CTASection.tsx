"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart, Phone, Users } from "lucide-react";

interface CTASectionProps {
  variant: "donate" | "help" | "volunteer";
}

const ctaConfigs = {
  donate: {
    id: "donate",
    gradient: "from-[#E62129] to-[#F15A29]",
    icon: Heart,
    title: "ПОЖЕРТВОВАТЬ",
    description: "Каждое пожертвование — это реальная помощь тем, кто в ней нуждается. Поддержите наши программы любой суммой.",
    buttonText: "Пожертвовать",
    buttonGradient: "from-white to-gray-100",
    buttonTextColor: "text-[#E62129]",
  },
  help: {
    id: "help",
    gradient: "from-[#3A5FCD] to-[#5A7FDD]",
    icon: Phone,
    title: "ПОЛУЧИТЬ ПОМОЩЬ",
    description: "Если вы оказались в трудной жизненной ситуации, мы готовы помочь. Оставьте заявку, и мы свяжемся с вами.",
    buttonText: "Оставить заявку",
    buttonGradient: "from-white to-gray-100",
    buttonTextColor: "text-[#3A5FCD]",
  },
  volunteer: {
    id: "volunteer",
    gradient: "from-[#7CDA28] to-[#F7E934]",
    icon: Users,
    title: "СТАТЬ ВОЛОНТЁРОМ",
    description: "Присоединяйтесь к нашей команде! Вместе мы можем сделать больше. Станьте частью большого доброго дела.",
    buttonText: "Стать волонтёром",
    buttonGradient: "from-white to-gray-100",
    buttonTextColor: "text-foreground",
  },
};

export function CTASection({ variant }: CTASectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  
  const config = ctaConfigs[variant];
  const Icon = config.icon;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      id={config.id}
      className="py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "relative rounded-3xl overflow-hidden",
            isVisible ? "animate-scale-in" : "opacity-0"
          )}
        >
          {/* Gradient Background */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br",
            config.gradient
          )} />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-20 pattern-hearts" />
          
          {/* Content */}
          <div className="relative p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Title */}
              <div className="text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                
                <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
                  {config.title.split(" ").map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>
              </div>

              {/* Right Side - Content */}
              <div className="text-white/90">
                <p className="text-lg leading-relaxed mb-6">
                  {config.description}
                </p>
                
                <a
                  href={`#${config.id}-form`}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-8 py-4 rounded-full",
                    "bg-gradient-to-r",
                    config.buttonGradient,
                    config.buttonTextColor,
                    "font-semibold",
                    "hover:shadow-xl hover:scale-105",
                    "transition-all duration-300"
                  )}
                >
                  {config.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Combined CTA sections component
export function CTASections() {
  return (
    <div className="space-y-4">
      <CTASection variant="donate" />
      <CTASection variant="help" />
      <CTASection variant="volunteer" />
    </div>
  );
}

export default CTASection;
