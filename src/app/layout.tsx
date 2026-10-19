import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gasnhaminh.com"),
  title: "Đổi Bình Gas Chính Hãng TP.HCM – Giao 15P | Gas Nhà Mình",
  description: "Dịch vụ đổi bình gas 12kg, 45kg chính hãng giao tận nhà 15–20 phút tại TP.HCM. Đủ cân, nguyên tem chống giả, kiểm tra van miễn phí. Gọi: 0888 113 831.",
  keywords: [
    "gas nhà mình",
    "giao gas tận nhà",
    "đổi bình gas 12kg",
    "đổi gas chính hãng",
    "giao gas hỏa tốc"
  ],
  authors: [{ name: "Gas Nhà Mình" }],
  alternates: {
    canonical: "https://gasnhaminh.com",
  },
  openGraph: {
    title: "Đổi Bình Gas Chính Hãng TP.HCM – Giao 15P | Gas Nhà Mình",
    description: "Dịch vụ đổi bình gas 12kg, 45kg chính hãng giao tận nhà 15–20 phút tại TP.HCM. Đủ cân, nguyên tem chống giả, kiểm tra van miễn phí. Gọi: 0888 113 831.",
    url: "https://gasnhaminh.com",
    siteName: "Gas Nhà Mình",
    images: [
      {
        url: "/hero_gasnhaminh.jpg",
        width: 1200,
        height: 630,
        alt: "Gas Nhà Mình - Giao Gas Siêu Tốc TP.HCM",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đổi Bình Gas Chính Hãng TP.HCM – Giao 15P | Gas Nhà Mình",
    description: "Dịch vụ đổi bình gas 12kg, 45kg chính hãng giao tận nhà 15–20 phút tại TP.HCM. Hotline: 0888 113 831.",
    images: ["/hero_gasnhaminh.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

import Script from "next/script";

async function getDomainConfig() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gasnhaminh.com";
    const domain = siteUrl.replace(/^https?:\/\//, "").split("/")[0].split(":")[0] || "gasnhaminh.com";
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://crm.posplus.vn";
    const res = await fetch(`${API_URL}/api/v1/domain_configs?domain=${domain}`, { next: { revalidate: 300 } });
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'success' && json.data && json.data.length > 0) {
        return json.data[0];
      }
    }
  } catch (error) {
    console.error("Failed to fetch domain config:", error);
  }
  return {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6CP6ETY5GS",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18424275416",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domainConfig = await getDomainConfig();
  const GA_MEASUREMENT_ID = domainConfig.ga4MeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6CP6ETY5GS";
  const GTM_ID = domainConfig.gtmId || process.env.NEXT_PUBLIC_GTM_ID || "";
  const GOOGLE_ADS_ID = domainConfig.googleAdsId || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18424275416";

  return (
    <html lang="vi">
      <head>
        {/* ─── Resource Hints & Preconnect ───────────────────────────────── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://crm.posplus.vn" />
        <link rel="dns-prefetch" href="https://crm.posplus.vn" />
        <meta name="theme-color" content="#0284C7" />

        {/* ─── Google Tag (gtag.js) for Google Ads & GA4 ─────────────────── */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
              ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
            `,
          }}
        />

        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
                  "@id": "https://gasnhaminh.com/#business",
                  "name": "GAS NHÀ MÌNH",
                  "url": "https://gasnhaminh.com",
                  "image": "https://gasnhaminh.com/logo.png",
                  "telephone": "0888 113 831",
                  "priceRange": "500.000đ - 1.730.000đ",
                  "currenciesAccepted": "VND",
                  "paymentAccepted": "Tiền mặt, Chuyển khoản",
                  "description": "Dịch vụ đổi bình gas 12kg, 45kg chính hãng chăm sóc gian bếp gia đình tại TP.HCM. Giao nhanh 15–20 phút, đủ cân, nguyên tem chống giả, vệ sinh bếp miễn phí.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1009 Phạm Thế Hiển, Phường Chánh Hưng",
                    "addressLocality": "Quận 8",
                    "addressRegion": "Thành phố Hồ Chí Minh",
                    "postalCode": "700000",
                    "addressCountry": "VN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 10.7428,
                    "longitude": 106.6634
                  },
                  "sameAs": [
                    "https://zalo.me/0888113831"
                  ],
                  "areaServed": {
                    "@type": "City",
                    "name": "Thành phố Hồ Chí Minh"
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                    ],
                    "opens": "06:00",
                    "closes": "22:00"
                  },
                  "department": [
                    {
                      "@type": "HomeAndConstructionBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Quận 8",
                      "url": "https://gasnhaminh.com/giao-gas/quan-8",
                      "image": "https://gasnhaminh.com/logo.png",
                      "priceRange": "500.000đ - 1.730.000đ",
                      "telephone": "0888 113 831",
                      "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "06:00",
                        "closes": "22:00"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "1009 Phạm Thế Hiển, Phường Chánh Hưng",
                        "addressLocality": "Quận 8",
                        "addressRegion": "Thành phố Hồ Chí Minh",
                        "postalCode": "700000",
                        "addressCountry": "VN"
                      }
                    },
                    {
                      "@type": "HomeAndConstructionBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Tân Phú",
                      "url": "https://gasnhaminh.com/giao-gas/tan-phu",
                      "image": "https://gasnhaminh.com/logo.png",
                      "priceRange": "500.000đ - 1.730.000đ",
                      "telephone": "0888 113 831",
                      "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "06:00",
                        "closes": "22:00"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "36 Nguyễn Văn Huyên, Phường Phú Thọ Hòa",
                        "addressLocality": "Quận Tân Phú",
                        "addressRegion": "Thành phố Hồ Chí Minh",
                        "postalCode": "700000",
                        "addressCountry": "VN"
                      }
                    },
                    {
                      "@type": "HomeAndConstructionBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Bà Điểm (Hóc Môn)",
                      "url": "https://gasnhaminh.com/giao-gas/hoc-mon",
                      "image": "https://gasnhaminh.com/logo.png",
                      "priceRange": "500.000đ - 1.730.000đ",
                      "telephone": "0888 113 831",
                      "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "06:00",
                        "closes": "22:00"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "64A Nguyễn Thị Hai, Xã Bà Điểm",
                        "addressLocality": "Huyện Hóc Môn",
                        "addressRegion": "Thành phố Hồ Chí Minh",
                        "postalCode": "700000",
                        "addressCountry": "VN"
                      }
                    },
                    {
                      "@type": "HomeAndConstructionBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Tân Hiệp (Hóc Môn)",
                      "url": "https://gasnhaminh.com/giao-gas/hoc-mon",
                      "image": "https://gasnhaminh.com/logo.png",
                      "priceRange": "500.000đ - 1.730.000đ",
                      "telephone": "0888 113 831",
                      "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "06:00",
                        "closes": "22:00"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "111/7H Ấp Thới Tây 2, Tân Hiệp 18, Xã Tân Hiệp",
                        "addressLocality": "Huyện Hóc Môn",
                        "addressRegion": "Thành phố Hồ Chí Minh",
                        "postalCode": "700000",
                        "addressCountry": "VN"
                      }
                    },
                    {
                      "@type": "HomeAndConstructionBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Quận 6 (Cư Xá Bình Phú)",
                      "url": "https://gasnhaminh.com/giao-gas/quan-6",
                      "image": "https://gasnhaminh.com/logo.png",
                      "priceRange": "500.000đ - 1.730.000đ",
                      "telephone": "0888 113 831",
                      "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "06:00",
                        "closes": "22:00"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "14R Đường 32B Cư Xá Bình Phú, Phường 10",
                        "addressLocality": "Quận 6",
                        "addressRegion": "Thành phố Hồ Chí Minh",
                        "postalCode": "700000",
                        "addressCountry": "VN"
                      }
                    }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://gasnhaminh.com/#website",
                  "name": "Gas Nhà Mình",
                  "url": "https://gasnhaminh.com",
                  "inLanguage": "vi-VN",
                  "description": "Dịch vụ giao gas tận nhà siêu tốc 15–20 phút tại TP.HCM. Đổi bình gas chính hãng 12kg, 45kg đủ cân, nguyên tem chống giả."
                },
                {
                  "@type": "Service",
                  "@id": "https://gasnhaminh.com/#service-delivery",
                  "name": "Dịch vụ đổi bình gas & giao gas tận nhà 15 phút",
                  "serviceType": "Giao gas siêu tốc",
                  "provider": {
                    "@id": "https://gasnhaminh.com/#business"
                  },
                  "areaServed": {
                    "@type": "City",
                    "name": "Thành phố Hồ Chí Minh"
                  },
                  "description": "Dịch vụ đổi bình gas 12kg, 45kg giao tận nơi trong 15–20 phút tại 24 quận huyện TP.HCM. Bình chính hãng nguyên tem niêm phong, kiểm tra rò rỉ van bếp miễn phí."
                }
              ]
            })
          }}
        />
      </head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
