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
  metadataBase: new URL("https://gudenkofund.vercel.app"),
  title: "Фонд Гуденко — Семейный благотворительный фонд",
  description: "Помогаем вместе. Здравоохранение, образование, экология — меняем жизни к лучшему уже более 10 лет.",
  keywords: ["Фонд Гуденко", "Gudenko Fund", "благотворительный фонд", "помощь", "волонтёрство", "пожертвовать"],
  authors: [{ name: "Фонд Гуденко" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "32x32" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
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
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Фонд Гуденко — Семейный благотворительный фонд",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Фонд Гуденко — Семейный благотворительный фонд",
    description: "Помогаем вместе. Меняем жизни к лучшему уже более 10 лет.",
    images: ["/images/og-image.jpg"],
  },
};

// Schema.org JSON-LD для логотипа в результатах поиска Google
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Фонд Гуденко",
  "alternateName": "Gudenko Fund",
  "url": "https://gudenkofund.vercel.app",
  "logo": "https://gudenkofund.vercel.app/images/logo.jpg",
  "image": "https://gudenkofund.vercel.app/images/og-image.jpg",
  "description": "Семейный благотворительный фонд. Помогаем вместе уже более 10 лет. Здравоохранение, образование, экология.",
  "foundingDate": "2012",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Москва",
    "addressCountry": "RU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-800-123-45-67",
    "contactType": "customer service",
    "email": "info@gudenko.fund"
  },
  "sameAs": [
    "https://vk.com/gudenko_fund"
  ]
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
        <link rel="icon" href="/favicon.ico?v=2" sizes="32x32" />
        <link rel="icon" href="/favicon-32x32.png?v=2" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
