"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  personName: string | null;
  personAge: number | null;
  location: string | null;
  category: string | null;
  isFeatured: boolean;
}

interface StoriesProps {
  stories: Story[];
}

export function Stories({ stories }: StoriesProps) {
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

  const featuredStory = stories.find((s) => s.isFeatured) || stories[0];
  const otherStories = stories.filter((s) => s.id !== featuredStory?.id).slice(0, 3);

  // Category colors
  const categoryColors: Record<string, string> = {
    "Медицина": "from-[#E62129] to-[#F15A29]",
    "Образование": "from-[#3A539B] to-[#6BB6FF]",
    "Экология": "from-[#7CDA28] to-[#F7E934]",
  };

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="py-20 lg:py-28 bg-gray-50"
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
            Истории людей
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            За каждой цифрой в нашей статистике стоит живой человек со своей историей
          </p>
        </div>

        {/* Featured Story */}
        {featuredStory && (
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8",
              isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            )}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#3A5FCD] to-[#5A7FDD]">
              <div className="absolute inset-0 flex items-center justify-center pattern-people">
                <span className="text-6xl">📸</span>
              </div>
              {featuredStory.category && (
                <div className={cn(
                  "absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-bold",
                  "bg-gradient-to-r",
                  categoryColors[featuredStory.category] || "from-[#E62129] to-[#F15A29]"
                )}>
                  {featuredStory.category}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 lg:p-8 bg-white rounded-3xl border border-gray-100">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {featuredStory.title}
              </h3>

              {featuredStory.personName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span className="font-medium">{featuredStory.personName}</span>
                  {featuredStory.personAge && (
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">{featuredStory.personAge} лет</span>
                  )}
                  {featuredStory.location && (
                    <>
                      <span>•</span>
                      <span>{featuredStory.location}</span>
                    </>
                  )}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed mb-6">
                {featuredStory.excerpt}
              </p>

              <a
                href={`#story-${featuredStory.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-white font-semibold hover:bg-foreground/80 transition-colors w-fit"
              >
                Читать историю
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Other Stories Grid */}
        {otherStories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStories.map((story, index) => (
              <div
                key={story.id}
                className={cn(
                  "group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                  isVisible ? "animate-scale-in" : "opacity-0"
                )}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">📸</span>
                  </div>
                  {story.category && (
                    <div className={cn(
                      "absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold",
                      "bg-gradient-to-r",
                      categoryColors[story.category] || "from-[#E62129] to-[#F15A29]"
                    )}>
                      {story.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-[#E62129] transition-colors">
                    {story.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {story.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="#all-stories"
            className={cn(
              "inline-flex items-center gap-2",
              "px-8 py-4 rounded-full",
              "bg-white border border-gray-200 text-foreground font-semibold",
              "hover:bg-gray-50 hover:border-gray-300",
              "transition-all duration-200"
            )}
          >
            Все истории
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Stories;
