import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAS NHÀ MÌNH – Nền tảng đặt gas gần bạn",
  description: "Hết gas, gọi Nhà Mình. Nền tảng đặt gas gần bạn",
  keywords: ["giao gas", "đổi gas", "gas hỏa tốc", "gas chính hãng", "giao gas nhanh", "gọi gas", "đặt gas"],
  authors: [{ name: "GoodGasStore" }],
  openGraph: {
    title: "GAS NHÀ MÌNH – Nền tảng đặt gas gần bạn",
    description: "Hết gas, gọi Nhà Mình. Nền tảng đặt gas gần bạn",
    url: "https://gaso.vn", // Tạm dùng domain Vercel, bạn có thể sửa khi có domain chính thức
    siteName: "GoodGasStore",
    images: [
      {
        url: "/logo-goodgas.png", // Cần bổ sung một hình ảnh og-image.jpg trong thư mục public
        width: 1200,
        height: 630,
        alt: "GoodGasStore",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAS NHÀ MÌNH – Nền tảng đặt gas gần bạn",
    description: "Hết gas, gọi Nhà Mình. Nền tảng đặt gas gần bạn",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6CP6ETY5GS";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "GAS NHÀ MÌNH",
              "image": "https://gaso.vn/logo-goodgas.png",
              "telephone": "19001234",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Đường ABC",
                "addressLocality": "TP HCM",
                "addressCountry": "VN"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
