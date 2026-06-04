"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Heart, 
  GraduationCap, 
  Leaf, 
  HandHeart, 
  Users, 
  Phone,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { 
    href: "#healthcare", 
    label: "Здравоохранение", 
    gradient: "from-[#E62828] to-[#FF6B35]",
    icon: Heart 
  },
  { 
    href: "#education", 
    label: "Образование", 
    gradient: "from-[#3A539B] to-[#6BB6FF]",
    icon: GraduationCap 
  },
  { 
    href: "#ecology", 
    label: "Экология", 
    gradient: "from-[#8BC34A] to-[#FFEB3B]",
    icon: Leaf 
  },
  { 
    href: "#donate", 
    label: "Пожертвовать", 
    gradient: "from-[#E62129] to-[#F15A29]",
    icon: HandHeart 
  },
  { 
    href: "#help", 
    label: "Получить помощь", 
    gradient: "from-[#3A5FCD] to-[#5A7FDD]",
    icon: Phone 
  },
  { 
    href: "#volunteer", 
    label: "Стать волонтёром", 
    gradient: "from-[#7CDA28] to-[#F7E934]",
    icon: Users 
  },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-white py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E62129] to-[#FF6B35] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="font-display text-xl font-bold text-foreground group-hover:text-[#E62129] transition-colors">
              Фонд Гуденко
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#donate"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E62129] to-[#F15A29] text-white text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Пожертвовать
            </a>
            <a
              href="#help"
              className="px-5 py-2.5 rounded-full bg-[#3A5FCD] text-white text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Получить помощь
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-0">
              <div className="flex flex-col h-full bg-white">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-display text-lg font-bold">Меню</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl transition-all duration-200",
                          "bg-gradient-to-r text-white",
                          item.gradient,
                          "hover:shadow-lg hover:scale-[1.02]"
                        )}
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-display text-lg font-bold">
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-center text-muted-foreground">
                    Вместе мы делаем мир лучше 💛
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

export default Header;
