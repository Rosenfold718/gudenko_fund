import type { Metadata } from "next";
import { Nunito_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Nunito Sans — тёплый, дружелюбный, современный sans-serif для основного текста
const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Unbounded — геометрический, жирный, современный для заголовков
const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Фонд Гуденко — Семейный благотворительный фонд",
  description: "Помогаем вместе. Здравоохранение, образование, экология — меняем жизни к лучшему уже более 10 лет.",
  keywords: ["Фонд Гуденко", "Gudenko Fund", "благотворительный фонд", "помощь", "волонтёрство", "пожертвовать"],
  authors: [{ name: "Фонд Гуденко" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Фонд Гуденко — Семейный благотворительный фонд",
    description: "Помогаем вместе. Меняем жизни к лучшему уже более 10 лет.",
    url: "https://gudenko.fund",
    siteName: "Фонд Гуденко",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} ${unbounded.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
