import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gasnhaminh.com"),
  title: "Gas Nhà Mình – Đặt Gas, Giao Gas Tận Nhà Siêu Tốc 15-20 Phút TP.HCM",
  description: "Hết gas, gọi Gas Nhà Mình. Giao gas, đặt gas online, đổi bình gas hỏa tốc tại tất cả quận huyện TP.HCM. Cân đối chứng tại nhà, cam kết bình gas chính hãng V-Gas, Petrolimex, Tuấn Khang 12kg và gas bò 45kg an toàn tuyệt đối. Hotline: 0888 113 831.",
  keywords: [
    "gas nhà mình",
    "đặt gas nhà mình",
    "gọi gas nhà mình",
    "đại lý gas nhà mình",
    "giao gas",
    "giao gas tphcm",
    "giao gas hcm",
    "đặt gas",
    "đặt gas tphcm",
    "đặt gas online",
    "gọi gas",
    "gọi gas tphcm",
    "đổi gas",
    "đổi gas bình",
    "đổi gas tphcm",
    "giá gas hôm nay",
    "đại lý gas",
    "đại lý gas tphcm",
    "gas chính hãng",
    "giao gas nhanh",
    "gas bình 12kg",
    "gas bò 45 kg",
    "bình gas bò 45kg",
    "gas v-gas xám 12kg",
    "gas v-gas đỏ 12 kg",
    "gas petrolimex đứng 12kg",
    "gas petrolimex shell 12kg",
    "gas v-gas-pe 12kg",
    "gas v-gas-shell 12kg",
    "gas v-gas vàng 12kg",
    "gas v-gas xanh đen 12kg",
    "gas tuấn khang vàng 12kg",
    "gas tuấn khang xanh 12kg",
    "giao gas quận 1", "giao gas quận 2", "giao gas quận 3", "giao gas quận 4", "giao gas quận 5",
    "giao gas quận 6", "giao gas quận 7", "giao gas quận 8", "giao gas quận 9", "giao gas quận 10",
    "giao gas quận 11", "giao gas quận 12", "giao gas bình thạnh", "giao gas gò vấp", "giao gas phú nhuận",
    "giao gas tân bình", "giao gas tân phú", "giao gas bình tân", "giao gas thủ đức",
    "đặt gas quận 1", "đặt gas quận 7", "đặt gas bình thạnh", "đặt gas gò vấp", "đặt gas tân bình",
    "gọi gas quận 1", "gọi gas quận 7", "gọi gas bình thạnh", "gọi gas gò vấp", "gọi gas tân bình",
  ],
  authors: [{ name: "Gas Nhà Mình" }],
  alternates: {
    canonical: "https://gasnhaminh.com",
  },
  openGraph: {
    title: "Gas Nhà Mình – Đặt Gas, Giao Gas Tận Nhà Siêu Tốc 15-20 Phút TP.HCM",
    description: "Hết gas, gọi Gas Nhà Mình. Giao gas, đặt gas online, đổi bình gas hỏa tốc tại tất cả quận huyện TP.HCM. Cân đối chứng tại nhà, cam kết bình gas chính hãng V-Gas, Petrolimex, Tuấn Khang 12kg và gas bò 45kg an toàn tuyệt đối.",
    url: "https://gasnhaminh.com",
    siteName: "Gas Nhà Mình",
    images: [
      {
        url: "https://images.unsplash.com/photo-1736960894843-bc9afe9b22c9?w=1200&h=630&fit=crop&auto=format",
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
    title: "Gas Nhà Mình – Đặt Gas, Giao Gas Tận Nhà Siêu Tốc 15-20 Phút TP.HCM",
    description: "Hết gas, gọi Gas Nhà Mình. Giao gas, đặt gas online, đổi bình gas hỏa tốc tại tất cả quận huyện TP.HCM.",
    images: ["https://images.unsplash.com/photo-1736960894843-bc9afe9b22c9?w=1200&h=630&fit=crop&auto=format"],
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
                  "image": "https://images.unsplash.com/photo-1736960894843-bc9afe9b22c9?w=1200&h=630&fit=crop&auto=format",
                  "telephone": "0888 113 831",
                  "priceRange": "$$",
                  "description": "Dịch vụ giao gas tận nhà siêu tốc 15–20 phút tại TP.HCM. Đổi bình gas chính hãng 12kg, 45kg. Cân đối chứng tại nhà, an toàn tuyệt đối.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "TP HCM",
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
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://gasnhaminh.com/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Thời gian giao gas của Gas Nhà Mình mất bao lâu?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Thời gian giao gas trung bình từ 15–20 phút tại tất cả các quận huyện TP.HCM nhờ hệ thống trạm kho phân phối trực ban phủ khắp các khu vực."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Gas Nhà Mình cung cấp những loại bình gas nào?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Gas Nhà Mình phân phối đầy đủ các dòng bình gas gia đình 12kg (V-Gas xám, đỏ, vàng, PE, Petrolimex van đứng, Petrolimex van chụp shell, Tuấn Khang) và bình gas bò công nghiệp 45kg chuyên dụng cho quán ăn, nhà hàng."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Tôi có được cân đối chứng kiểm tra trọng lượng bình gas không?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "100% đơn hàng đều được kỹ thuật viên mang theo cân điện tử kiểm tra đủ 12kg gas thực, thay gioăng van và kiểm tra rò rỉ khí gas an toàn miễn phí trước khi quý khách thanh toán."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Bình gas tại Gas Nhà Mình có bảo hiểm không?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tất cả bình gas tại Gas Nhà Mình đều là hàng chính hãng 100%, có tem niêm phong màng co chống giả và được bảo hiểm trách nhiệm cháy nổ lên đến 10 tỷ đồng."
                      }
                    }
                  ]
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
