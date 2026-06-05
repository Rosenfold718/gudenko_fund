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
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";
import { useLocale } from "@/providers/locale-provider";

export function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { 
      href: "#healthcare", 
      labelKey: "nav.healthcare",
      gradient: "from-[#E62828] to-[#FF6B35]",
      icon: Heart 
    },
    { 
      href: "#education", 
      labelKey: "nav.education",
      gradient: "from-[#3A539B] to-[#6BB6FF]",
      icon: GraduationCap 
    },
    { 
      href: "#ecology", 
      labelKey: "nav.ecology",
      gradient: "from-[#8BC34A] to-[#FFEB3B]",
      icon: Leaf 
    },
    { 
      href: "#donate", 
      labelKey: "nav.donate",
      gradient: "from-[#E62129] to-[#F15A29]",
      icon: HandHeart 
    },
    { 
      href: "#help", 
      labelKey: "nav.help",
      gradient: "from-[#3A5FCD] to-[#5A7FDD]",
      icon: Phone 
    },
    { 
      href: "#volunteer", 
      labelKey: "nav.volunteer",
      gradient: "from-[#7CDA28] to-[#F7E934]",
      icon: Users 
    },
  ];

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-background py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <img 
              src="/images/logo.jpg" 
              alt="Фонд Гуденко" 
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              Фонд Гуденко
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-all duration-300"
              >
                {t(item.labelKey)}
              </a>
            ))}
          </div>

          {/* Right side: Controls + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Theme & Language toggles */}
            <div className="flex items-center gap-1 mr-2">
              <LocaleToggle />
              <ThemeToggle />
            </div>
            
            {/* CTA Buttons */}
            <a
              href="#donate"
              className={cn(
                "px-5 py-2.5 rounded-full",
                "bg-gradient-to-r from-[#E62129] to-[#F15A29]",
                "text-white text-sm font-semibold",
                "hover:shadow-lg hover:shadow-red-500/25",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-0.5"
              )}
            >
              {t("nav.donate")}
            </a>
            <a
              href="#help"
              className={cn(
                "px-5 py-2.5 rounded-full",
                "bg-primary text-white text-sm font-semibold",
                "hover:shadow-lg hover:shadow-blue-500/25",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-0.5"
              )}
            >
              {t("nav.help")}
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-1 lg:hidden">
            <LocaleToggle />
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-0">
                <div className="flex flex-col h-full bg-background">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-display text-lg font-bold">{t("nav.menu")}</span>
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
                            "flex items-center gap-4 p-4 rounded-2xl",
                            "bg-gradient-to-r text-white",
                            item.gradient,
                            "transition-all duration-300 ease-out",
                            "hover:shadow-lg hover:-translate-y-0.5"
                          )}
                        >
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="font-display text-lg font-bold">
                            {t(item.labelKey)}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                  
                  {/* Footer */}
                  <div className="p-4 border-t bg-muted/50">
                    <p className="text-sm text-center text-muted-foreground">
                      {t("footer.together")} 💛
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
