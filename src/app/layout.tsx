import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gasnhaminh.com"),
  title: "Giao Gas Tận Nhà Siêu Tốc 15 Phút | Đổi Gas Chính Hãng – Gas Nhà Mình",
  description: "Dịch vụ giao gas tận nhà hỏa tốc 15–20 phút tại TP.HCM. Đổi bình gas 12kg, 45kg chính hãng đủ cân, nguyên tem chống giả. Hotline: 0888 113 831.",
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
    title: "Giao Gas Tận Nhà Siêu Tốc 15 Phút | Đổi Gas Chính Hãng – Gas Nhà Mình",
    description: "Dịch vụ giao gas tận nhà hỏa tốc 15–20 phút tại TP.HCM. Đổi bình gas 12kg, 45kg chính hãng đủ cân, nguyên tem chống giả. Hotline: 0888 113 831.",
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
    title: "Giao Gas Tận Nhà Siêu Tốc 15 Phút | Đổi Gas Chính Hãng – Gas Nhà Mình",
    description: "Dịch vụ giao gas tận nhà hỏa tốc 15–20 phút tại TP.HCM. Đổi bình gas 12kg, 45kg chính hãng. Hotline: 0888 113 831.",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

import Script from "next/script";
import { headers } from "next/headers";

async function getDomainConfig() {
  try {
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'gasnhaminh.com';
    const domain = host.split(':')[0];
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
                  "@type": "LocalBusiness",
                  "@id": "https://gasnhaminh.com/#business",
                  "name": "GAS NHÀ MÌNH",
                  "url": "https://gasnhaminh.com",
                  "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
                  "telephone": "0888 113 831",
                  "priceRange": "500.000đ - 1.730.000đ",
                  "currenciesAccepted": "VND",
                  "paymentAccepted": "Tiền mặt, Chuyển khoản",
                  "description": "Dịch vụ giao gas tận nhà siêu tốc 15–20 phút tại TP.HCM. Đổi bình gas chính hãng 12kg, 45kg. Nguyên tem chống giả, an toàn tuyệt đối.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1009 Phạm Thế Hiển, Phường Chánh Hưng",
                    "addressLocality": "Quận 8",
                    "addressRegion": "Thành phố Hồ Chí Minh",
                    "postalCode": "700000",
                    "addressCountry": "VN"
                  },
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
                      "@type": "LocalBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Quận 8",
                      "url": "https://gasnhaminh.com",
                      "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
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
                      "@type": "LocalBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Tân Phú",
                      "url": "https://gasnhaminh.com",
                      "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
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
                      "@type": "LocalBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Bà Điểm",
                      "url": "https://gasnhaminh.com",
                      "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
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
                      "@type": "LocalBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Tân Hiệp",
                      "url": "https://gasnhaminh.com",
                      "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
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
                      "@type": "LocalBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Quận 6 (Cư Xá Bình Phú)",
                      "url": "https://gasnhaminh.com",
                      "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
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
                  "description": "Dịch vụ giao gas tận nhà siêu tốc 15–20 phút tại TP.HCM. Đổi bình gas chính hãng 12kg, 45kg đủ cân, nguyên tem chống giả."
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
