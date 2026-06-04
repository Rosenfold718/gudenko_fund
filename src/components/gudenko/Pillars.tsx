"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart, GraduationCap, Leaf, Users, Music, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

// Map pillars to gradient colors and icons
const pillarStyles: Record<string, { gradient: string; icon: React.ElementType; color: string }> = {
  "medicine": {
    gradient: "from-[#E62828] to-[#FF6B35]",
    icon: Heart,
    color: "#E62828",
  },
  "education": {
    gradient: "from-[#3A539B] to-[#6BB6FF]",
    icon: GraduationCap,
    color: "#3A539B",
  },
  "ecology": {
    gradient: "from-[#8BC34A] to-[#FFEB3B]",
    icon: Leaf,
    color: "#8BC34A",
  },
  "social": {
    gradient: "from-[#E62129] to-[#F15A29]",
    icon: Users,
    color: "#E62129",
  },
  "culture": {
    gradient: "from-[#9B59B6] to-[#E74C3C]",
    icon: Music,
    color: "#9B59B6",
  },
};

// Detailed info for each pillar
const pillarDetails: Record<string, { fullDescription: string; programs: string[]; stats: { label: string; value: string }[] }> = {
  "education": {
    fullDescription: "Поддерживаем талантливых студентов и исследователей через стипендии, гранты и образовательные программы. Помогаем тем, кто хочет менять мир к лучшему через знания и науку.",
    programs: [
      "Стипендиальные программы для одарённых студентов",
      "Гранты на научные исследования",
      "Поддержка сельских школ",
      "Цифровое образование для детей",
    ],
    stats: [
      { label: "Стипендиатов", value: "150+" },
      { label: "Грантов выдано", value: "45" },
      { label: "Школ поддержано", value: "23" },
    ],
  },
  "medicine": {
    fullDescription: "Обеспечиваем доступ к качественному лечению для нуждающихся. Оплачиваем операции, реабилитацию и медицинские препараты. Каждая спасённая жизнь — наша победа.",
    programs: [
      "Оплата сложных операций",
      "Реабилитационные программы",
      "Лекарственное обеспечение",
      "Помощь детям с особенностями здоровья",
    ],
    stats: [
      { label: "Операций оплачено", value: "89" },
      { label: "Детей вылечено", value: "234" },
      { label: "Регионов охвачено", value: "15" },
    ],
  },
  "social": {
    fullDescription: "Помогаем семьям в трудных жизненных ситуациях. Оказываем адресную поддержку, продуктовую помощь и содействуем решению бытовых проблем.",
    programs: [
      "Адресная помощь семьям",
      "Продуктовые наборы",
      "Помощь в трудоустройстве",
      "Юридическая поддержка",
    ],
    stats: [
      { label: "Семей поддержано", value: "847" },
      { label: "Наборов выдано", value: "5000+" },
      { label: "Консультаций", value: "1200" },
    ],
  },
  "culture": {
    fullDescription: "Сохраняем культурное наследие и поддерживаем искусство. Организуем выставки, поддерживаем музеи и театры, развиваем образовательные проекты в сфере культуры.",
    programs: [
      "Поддержка музеев и театров",
      "Художественные выставки",
      "Образовательные программы",
      "Поддержка молодых художников",
    ],
    stats: [
      { label: "Проектов поддержано", value: "28" },
      { label: "Выставок организовано", value: "15" },
      { label: "Художников", value: "45" },
    ],
  },
  "ecology": {
    fullDescription: "Защищаем окружающую среду и развиваем экологическое сознание. Сажаем деревья, очищаем территории и ведём экологическое просвещение.",
    programs: [
      "Посадка деревьев и лесовосстановление",
      "Очистка территорий от мусора",
      "Экологическое просвещение",
      "Защита водных ресурсов",
    ],
    stats: [
      { label: "Деревьев посажено", value: "10000+" },
      { label: "Территорий очищено", value: "50" },
      { label: "Волонтёров", value: "500+" },
    ],
  },
};

export function Pillars({ pillars }: PillarsProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedPillar, setSelectedPillar] = React.useState<Pillar | null>(null);
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

  const displayPillars = pillars.length > 0 ? pillars : [
    { id: "1", title: "Образование", slug: "education", description: "Стипендии и гранты для студентов", icon: "📚" },
    { id: "2", title: "Медицина", slug: "medicine", description: "Оплата лечения и операций", icon: "❤️" },
    { id: "3", title: "Социальная поддержка", slug: "social", description: "Помощь семьям в трудностях", icon: "🤝" },
    { id: "4", title: "Культура", slug: "culture", description: "Поддержка искусства", icon: "🎭" },
    { id: "5", title: "Экология", slug: "ecology", description: "Защита природы", icon: "🌱" },
  ];

  return (
    <>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {displayPillars.map((pillar, index) => {
              const style = pillarStyles[pillar.slug] || pillarStyles["medicine"];
              const Icon = style.icon;
              
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden text-left",
                    "hover:shadow-xl hover:scale-[1.02]",
                    "transition-all duration-300",
                    isVisible ? "animate-scale-in" : "opacity-0"
                  )}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    style.gradient
                  )} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-4 lg:p-5 text-white">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display text-lg lg:text-xl font-bold leading-tight mb-2">
                      {pillar.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-xs lg:text-sm line-clamp-2 mb-3">
                      {pillar.description}
                    </p>
                    
                    {/* Link */}
                    <div className="flex items-center gap-1 text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                      <span>Подробнее</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal Dialog */}
      <Dialog open={!!selectedPillar} onOpenChange={() => setSelectedPillar(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPillar && (() => {
            const style = pillarStyles[selectedPillar.slug] || pillarStyles["medicine"];
            const details = pillarDetails[selectedPillar.slug] || pillarDetails["medicine"];
            const Icon = style.icon;
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      "bg-gradient-to-br",
                      style.gradient,
                      "text-white"
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <DialogTitle className="text-2xl lg:text-3xl">
                      {selectedPillar.title}
                    </DialogTitle>
                  </div>
                </DialogHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {details.fullDescription}
                  </p>
                  
                  {/* Programs */}
                  <div>
                    <h4 className="font-display font-bold text-lg mb-3">Программы</h4>
                    <ul className="space-y-2">
                      {details.programs.map((program, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{program}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {details.stats.map((stat, i) => (
                      <div key={i} className="text-center p-4 rounded-xl bg-muted">
                        <div className="font-display text-2xl font-bold" style={{ color: style.color }}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex gap-3 pt-4">
                    <a
                      href="#donate"
                      onClick={() => setSelectedPillar(null)}
                      className={cn(
                        "flex-1 text-center py-3 rounded-full",
                        "bg-gradient-to-r",
                        style.gradient,
                        "text-white font-semibold",
                        "hover:shadow-lg hover:scale-[1.02]",
                        "transition-all duration-300"
                      )}
                    >
                      Помочь
                    </a>
                    <button
                      onClick={() => setSelectedPillar(null)}
                      className="px-6 py-3 rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Pillars;
