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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
