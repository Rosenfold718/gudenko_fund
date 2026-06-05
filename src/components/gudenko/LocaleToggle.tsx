"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <Button
      variant="ghost"
      onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
      className={cn(
        "rounded-full px-3 h-9 min-w-[44px]",
        "font-medium text-sm",
        "hover:bg-muted transition-all duration-300"
      )}
      aria-label={locale === "ru" ? "Switch to English" : "Переключить на русский"}
    >
      <span className={cn(
        "transition-opacity duration-200",
        locale === "ru" ? "opacity-100" : "opacity-70"
      )}>
        {locale === "ru" ? "RU" : "EN"}
      </span>
    </Button>
  );
}
