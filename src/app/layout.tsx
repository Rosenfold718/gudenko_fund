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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Фонд Гуденко — Семейный благотворительный фонд",
    description: "Помогаем вместе. Меняем жизни к лучшему уже более 10 лет.",
    url: "https://gudenkofund.vercel.app",
    siteName: "Фонд Гуденко",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Фонд Гуденко",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Фонд Гуденко — Семейный благотворительный фонд",
    description: "Помогаем вместе. Меняем жизни к лучшему уже более 10 лет.",
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E62129" />
      </head>
      <body
        className={`${nunitoSans.variable} ${unbounded.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
