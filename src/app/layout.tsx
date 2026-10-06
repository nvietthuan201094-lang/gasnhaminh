import type { Metadata } from "next";
import "./globals.css";
import { createProductSchema } from "@/lib/seo-schema";

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
                  },
                  "department": [
                    {
                      "@type": "LocalBusiness",
                      "name": "Gas Nhà Mình - Chi nhánh Quận 8",
                      "url": "https://gasnhaminh.com",
                      "image": "https://gasnhaminh.com/hero_gasnhaminh.jpg",
                      "priceRange": "500.000đ - 1.730.000đ",
                      "telephone": "0888 113 831",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "1009 Phạm Thế Hiển, Phường Chánh Hưng",
                        "addressLocality": "Quận 8",
                        "addressRegion": "Hồ Chí Minh",
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
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "36 Nguyễn Văn Huyên, Phường Phú Thọ Hòa",
                        "addressLocality": "Quận Tân Phú",
                        "addressRegion": "Hồ Chí Minh",
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
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "64A Nguyễn Thị Hai, Xã Bà Điểm",
                        "addressLocality": "Huyện Hóc Môn",
                        "addressRegion": "Hồ Chí Minh",
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
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "111/7H Ấp Thới Tây 2, Tân Hiệp 18, Xã Tân Hiệp",
                        "addressLocality": "Huyện Hóc Môn",
                        "addressRegion": "Hồ Chí Minh",
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
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "14R Đường 32B Cư Xá Bình Phú, Phường 10",
                        "addressLocality": "Quận 6",
                        "addressRegion": "Hồ Chí Minh",
                        "addressCountry": "VN"
                      }
                    }
                  ]
                },
                {
                  "@type": "ItemList",
                  "@id": "https://gasnhaminh.com/#pricelist",
                  "name": "Bảng Giá Gas Hôm Nay Mới Nhất 2026 – Gas Nhà Mình",
                  "description": "Báo giá đổi bình gas 12kg gia đình và gas bò 45kg chính hãng tại TP.HCM",
                  "itemListElement": [
                    createProductSchema({
                      position: 1,
                      name: "Gas V-Gas xám 12kg",
                      image: "https://crm.posplus.vn/api/v1/public_image/product.template/168/image_1024",
                      description: "Bình V-Gas xám 12kg ngọn lửa xanh tiết kiệm, vỏ bình chuẩn PCCC, nguyên tem niêm phong chính hãng khi giao.",
                      brand: "V-Gas",
                      sku: "gas-v-gas-xam-12kg",
                      mpn: "gas-v-gas-xam-12kg",
                      price: 530000,
                      url: "https://gasnhaminh.com/bang-gia",
                      sellerName: "Gas Nhà Mình",
                    }),
                    createProductSchema({
                      position: 2,
                      name: "Gas Petrolimex đứng 12kg",
                      image: "https://crm.posplus.vn/api/v1/public_image/product.template/175/image_1024",
                      description: "Bình gas Petrolimex đứng 12kg chính hãng Tập đoàn Dầu khí, màng co chống giả và tem tích hợp QR Code.",
                      brand: "Petrolimex",
                      sku: "gas-petrolimex-dung-12kg",
                      mpn: "gas-petrolimex-dung-12kg",
                      price: 500000,
                      url: "https://gasnhaminh.com/bang-gia",
                      sellerName: "Gas Nhà Mình",
                    }),
                    createProductSchema({
                      position: 3,
                      name: "Gas Petrolimex shell 12kg",
                      image: "https://crm.posplus.vn/api/v1/public_image/product.template/176/image_1024",
                      description: "Bình Petrolimex van chụp Shell 12kg cao cấp, kiểm định nghiêm ngặt theo tiêu chuẩn quốc tế.",
                      brand: "Petrolimex",
                      sku: "gas-petrolimex-shell-12kg",
                      mpn: "gas-petrolimex-shell-12kg",
                      price: 500000,
                      url: "https://gasnhaminh.com/bang-gia",
                      sellerName: "Gas Nhà Mình",
                    }),
                    createProductSchema({
                      position: 4,
                      name: "Gas Tuấn Khang vàng 12kg",
                      image: "https://crm.posplus.vn/api/v1/public_image/product.template/169/image_1024",
                      description: "Bình gas Tuấn Khang vàng 12kg chất lượng ổn định, lửa xanh mạnh, lựa chọn kinh tế cho mọi gia đình.",
                      brand: "Tuấn Khang Gas",
                      sku: "gas-tuan-khang-vang-12kg",
                      mpn: "gas-tuan-khang-vang-12kg",
                      price: 550000,
                      url: "https://gasnhaminh.com/bang-gia",
                      sellerName: "Gas Nhà Mình",
                    }),
                    createProductSchema({
                      position: 5,
                      name: "Gas bò 45 kg",
                      image: "https://crm.posplus.vn/api/v1/public_image/product.template/170/image_1024",
                      description: "Bình gas bò 45kg chuyên dụng cho nhà hàng, quán ăn, xưởng chế biến. Giao xe tải tận nơi, xuất VAT đầy đủ.",
                      brand: "PetroVietnam / Saigon Petro",
                      sku: "gas-bo-45-kg",
                      mpn: "gas-bo-45-kg",
                      price: 1730000,
                      url: "https://gasnhaminh.com/bang-gia",
                      sellerName: "Gas Nhà Mình",
                    }),
                  ]
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
                      "name": "Tôi có được cân đối chứng kiểm tra trọng lượng bình gas không? Làm sao biết bình đủ 12kg ruột?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Bình gas 12kg gia đình đã được chiết nạp tự động chuẩn xác đủ 12kg ruột tại nhà máy của hãng và niêm phong màng co nhiệt chống giả. Trọng lượng vỏ bình được dập nổi rõ ràng trên quai xách. Để đảm bảo giao hỏa tốc 15 phút, nhân viên không mang theo cân cồng kềnh mà sẽ cùng quý khách kiểm tra nguyên vẹn tem màng co, hạn kiểm định vỏ bình và thử rò rỉ khí gas an toàn. Nếu gia đình có sẵn cân tại nhà, quý khách hoàn toàn có thể kiểm tra đối chứng trước khi nhận."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Quy trình kiểm tra an toàn khi đổi bình gas như thế nào?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Mọi bình gas phân phối qua Gas Nhà Mình đều là hàng chính hãng từ nhà sản xuất uy tín, có tem kiểm định an toàn PCCC và nguyên màng co niêm phong. Khi giao gas, kỹ thuật viên sẽ hỗ trợ kiểm tra độ kín của van dây, kiểm tra rò rỉ khí gas bằng máy dò/dung dịch chuyên dụng và vệ sinh bếp miễn phí trước khi bàn giao."
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
