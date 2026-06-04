import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Premium Font Families
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      
      // Premium Brand Colors — Quiet Luxury Palette
      colors: {
        // Brand Colors
        "navy-heritage": "var(--navy-heritage)",
        "deep-ocean": "var(--deep-ocean)",
        "warm-ivory": "var(--warm-ivory)",
        "soft-cream": "var(--soft-cream)",
        "noble-gold": "var(--noble-gold)",
        "brushed-gold": "var(--brushed-gold)",
        "warm-gray": "var(--warm-gray)",
        "light-mist": "var(--light-mist)",
        
        // Marketplace Accents
        "soft-coral": "var(--soft-coral)",
        "sage-green": "var(--sage-green)",
        "sky-blue": "var(--sky-blue)",
        
        // Theme Variables
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      
      // Premium Typography Scale
      fontSize: {
        // Hero & Display
        "hero-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "hero": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        
        // Headings
        "h1": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "h2": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "h3": ["1.75rem", { lineHeight: "1.3" }],
        "h4": ["1.375rem", { lineHeight: "1.35" }],
        
        // Body Text
        "body-xl": ["1.25rem", { lineHeight: "1.75" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body": ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.7" }],
        
        // Small Text
        "small": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        "overline": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      
      // Spacing — Magazine Layout
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      
      // Premium Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      
      // Animations
      animation: {
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "shimmer": "shimmer 1.5s infinite",
      },
      
      // Box Shadow — Premium Subtle
      boxShadow: {
        "soft": "0 2px 8px rgba(26, 43, 74, 0.04)",
        "medium": "0 4px 16px rgba(26, 43, 74, 0.08)",
        "elevated": "0 8px 32px rgba(26, 43, 74, 0.12)",
        "gold": "0 4px 16px rgba(201, 169, 98, 0.15)",
      },
      
      // Aspect Ratios
      aspectRatio: {
        "portrait": "3 / 4",
        "landscape": "4 / 3",
        "hero": "16 / 9",
        "square": "1 / 1",
        "card": "4 / 5",
      },
      
      // Z-Index Scale
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
