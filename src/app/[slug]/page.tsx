import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import {
  getDistrictBySlug,
  getAllDistricts,
  BRAND_NAME,
  SEO_PRODUCTS,
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  ZALO_URL,
} from '@/lib/districts';
import { createProductSchema } from '@/lib/seo-schema';
import ClientCheckoutWrapper from './ClientCheckoutWrapper';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const LEGACY_REDIRECT_SLUGS = new Set(['bo-binh-gas', 'bo-binh-gas-bep-gas']);

export async function generateStaticParams() {
  return SEO_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';

  if (LEGACY_REDIRECT_SLUGS.has(slug)) {
    return {
      metadataBase: new URL(siteUrl),
      title: `Bảng Giá Bình Gas & Trọn Bộ Bình Bếp Chính Hãng | ${BRAND_NAME}`,
      alternates: {
        canonical: `${siteUrl}/bang-gia`,
      },
    };
  }

  const district = getDistrictBySlug(slug);
  if (district) {
    return {
      metadataBase: new URL(siteUrl),
      title: `Giao Gas ${district.name} Siêu Tốc 15 Phút | ${BRAND_NAME}`,
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: `${siteUrl}/giao-gas/${district.slug}`,
      },
    };
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Sản phẩm không tồn tại | ${BRAND_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seoProd = SEO_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const canonicalUrl = `${siteUrl}/${slug}`;
  const priceText = seoProd?.price || `${new Intl.NumberFormat('vi-VN').format(product.price)}đ`;
  const weightText = seoProd?.weight || '12kg';
  const imageUrl = product.imageUrl || seoProd?.image || `${siteUrl}/hero_gasnhaminh.jpg`;

  const title = `Đổi Bình ${product.name} Chính Hãng – Giá ${priceText} | Gas Nhà Mình`;
  const description = `Đặt đổi bình ${product.name} chính hãng giá ${priceText} tại Gas Nhà Mình. Cam kết đủ ${weightText} ruột, nguyên tem chống giả, giao nhanh 15 phút TP.HCM. Hotline: ${HOTLINE_DISPLAY}.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Gas Nhà Mình',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 1024,
          alt: `Đổi bình ${product.name} chính hãng – Gas Nhà Mình`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Chuyển hướng 308 cho 2 URL combo cũ để giải quyết triệt để lỗi 404 trong GSC Validation
  if (LEGACY_REDIRECT_SLUGS.has(slug)) {
    permanentRedirect('/bang-gia');
  }

  // Nếu slug là đường dẫn quận (ví dụ /giao-gas-quan-7 hoặc /quan-7), chuyển hướng 308 sang /giao-gas/quan-7
  const district = getDistrictBySlug(slug);
  if (district) {
    permanentRedirect(`/giao-gas/${district.slug}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';
  const pageUrl = `${siteUrl}/${slug}`;
  const seoProd = SEO_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const brandName = seoProd?.brand || BRAND_NAME;
  const weight = seoProd?.weight || '12kg';
  const valveType = seoProd?.valveType || 'Van tiêu chuẩn an toàn';
  const priceDisplay = seoProd?.price || `${new Intl.NumberFormat('vi-VN').format(product.price)}đ`;
  const newPriceDisplay =
    seoProd?.newPrice ||
    `${new Intl.NumberFormat('vi-VN').format(product.price + (weight === '45kg' ? 1000000 : 250000))}đ`;
  const depositPriceDisplay = weight === '45kg' ? '1.000.000đ' : '250.000đ';
  const description =
    product.description ||
    seoProd?.desc ||
    `Bình ${product.name} chính hãng giao siêu tốc 15 phút tại TP.HCM.`;
  const image = product.imageUrl || seoProd?.image || `${siteUrl}/hero_gasnhaminh.jpg`;

  const otherProducts = SEO_PRODUCTS.filter((p) => p.slug !== slug);
  const districts = getAllDistricts();

  const faqItems = [
    {
      question: `Giá đổi bình ${product.name} tại Gas Nhà Mình hôm nay bao nhiêu?`,
      answer: `Giá đổi ruột bình ${product.name} chính hãng hôm nay tại Gas Nhà Mình là ${priceDisplay} (khi gia đình đã có sẵn vỏ bình ${weight}). Nếu mua mới trọn bộ lần đầu chưa có vỏ bình, tổng thanh toán là ${newPriceDisplay} (gồm ruột gas và ${depositPriceDisplay} tiền cọc vỏ bình có phiếu thu). Đã bao gồm VAT, miễn phí vận chuyển và công lắp đặt tận bếp.`,
    },
    {
      question: `Nhà tôi đang dùng vỏ bình hiệu khác đổi sang ${product.name} có tốn phí không?`,
      answer: `Không tốn thêm bất kỳ chi phí nào. Gas Nhà Mình hỗ trợ đổi ngang vỏ bình 0đ giữa tất cả các hãng gas ${weight} thông dụng tại TP.HCM (V-Gas, Petrolimex, Saigon Petro, Tuấn Khang, Shell Gas...) miễn vỏ bình còn nguyên vẹn và trong hạn kiểm định an toàn.`,
    },
    {
      question: `Bình ${product.name} sử dụng loại van gì? Khi giao có kiểm tra rò rỉ không?`,
      answer: `Bình ${product.name} trang bị ${valveType}. Mỗi lần giao gas, kỹ thuật viên Gas Nhà Mình đều thực hiện quy trình an toàn: kiểm tra van điều áp, thay gioăng cao su mới miễn phí, thử kín bằng bọt xà phòng và chỉnh lửa xanh đều trước khi bàn giao.`,
    },
    {
      question: `Đặt bình ${product.name} bao lâu thì nhân viên giao tới nơi?`,
      answer: `Chỉ từ 15–20 phút. Hệ thống Gas Nhà Mình có 5 trạm kho trực ban trải khắp TP.HCM (Quận 8, Tân Phú, Quận 6, Hóc Môn Bà Điểm & Tân Hiệp), giúp điều phối nhân viên gần địa chỉ của bạn nhất giao ngay cả trong giờ cao điểm nấu nướng.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...createProductSchema({
          name: product.name,
          description,
          image,
          sku: slug,
          brand: brandName,
          url: pageUrl,
          price: product.price,
          sellerName: 'Gas Nhà Mình',
        }),
        '@id': `${pageUrl}#product`,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bảng giá gas hôm nay',
            item: `${siteUrl}/bang-gia`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Header điều hướng */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Gas Nhà Mình - Hết gas gọi Nhà Mình"
                className="h-11 w-auto object-contain"
              />
              <span className="hidden sm:inline-block text-xs text-gray-500 font-bold pl-2 border-l border-gray-300">
                Hết gas, gọi Nhà Mình
              </span>
            </Link>
            <div className="flex items-center gap-2.5">
              <Link
                href="/bang-gia"
                className="hidden md:inline-block text-xs font-bold text-gray-700 hover:text-[#FF5722] px-3 py-2 transition-colors"
              >
                Bảng giá gas hôm nay
              </Link>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-50 hover:bg-orange-100 text-[#FF5722] border border-orange-200 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                💬 Zalo
              </a>
              <a
                href={HOTLINE_TEL}
                className="bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>📞</span>
                <span className="font-extrabold">{HOTLINE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100 py-2.5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#FF5722] transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/bang-gia" className="hover:text-[#FF5722] transition-colors">
                  Bảng giá gas hôm nay
                </Link>
              </li>
              <li>/</li>
              <li className="font-bold text-gray-900">{product.name}</li>
            </ol>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          {/* Phần Mở Đầu & Form Đặt Mua Trực Tuyến */}
          <section>
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#FF5722]">
                  Thương hiệu: {brandName}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ✓ Đủ {weight} ruột • Nguyên màng co chống giả
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  ⚡ Giao nhanh 15–20 phút TP.HCM
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-3">
                Đổi Bình {product.name} Chính Hãng – Giao Nhanh 15 Phút TP.HCM
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                {description} Giá đổi gas hôm nay tại <strong>Gas Nhà Mình</strong> là <strong>{priceDisplay}</strong> (đã bao gồm VAT, miễn phí giao tận nhà và công kiểm tra an toàn van dây).
              </p>
            </div>

            <ClientCheckoutWrapper product={product} />
          </section>

          {/* Bảng Thông Số Kỹ Thuật & Quy Cách An Toàn */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
              Thông Số Kỹ Thuật & Giá Đổi Bình {product.name}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Chi tiết quy cách bình, loại van tương thích và bảng giá niêm yết của bình {product.name} tại hệ thống Gas Nhà Mình:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60 w-1/3 sm:w-1/4 rounded-tl-xl">
                      Tên sản phẩm
                    </th>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{product.name}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60">
                      Thương hiệu sản xuất
                    </th>
                    <td className="py-3.5 px-4 text-gray-800">{brandName} (Phân phối chính hãng)</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60">
                      Trọng lượng ruột gas
                    </th>
                    <td className="py-3.5 px-4 text-emerald-700 font-bold">
                      Đủ {weight} nước gas tinh khiết (lửa xanh, không đen đáy nồi)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60">
                      Loại van bình gas
                    </th>
                    <td className="py-3.5 px-4 text-gray-800">{valveType}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60">
                      Giá đổi ruột gas hôm nay
                    </th>
                    <td className="py-3.5 px-4">
                      <span className="text-lg font-black text-[#FF5722]">{priceDisplay}</span>
                      <span className="text-xs text-gray-500 ml-2">(Áp dụng khi đã có vỏ bình {weight})</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60">
                      Giá mua bình mới (chưa có vỏ)
                    </th>
                    <td className="py-3.5 px-4 text-gray-800">
                      <strong>{newPriceDisplay}</strong> (Đã gồm ruột gas + tiền thế chân vỏ {depositPriceDisplay} hoàn lại 100% khi trả vỏ)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60">
                      Tiêu chuẩn an toàn PCCC
                    </th>
                    <td className="py-3.5 px-4 text-gray-800">
                      Vỏ thép chịu áp lực tiêu chuẩn DOT-4BA-240, kiểm định định kỳ, có mua Bảo hiểm trách nhiệm sản phẩm chính hãng.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <th className="py-3.5 px-4 font-bold text-gray-700 bg-gray-50/60 rounded-bl-xl">
                      Dịch vụ đi kèm tại Gas Nhà Mình
                    </th>
                    <td className="py-3.5 px-4 text-gray-800">
                      Giao nhanh 15 phút • Đổi ngang vỏ khác hãng 0đ • Miễn phí thử kín van dây & vệ sinh họng bếp • Bảo hành đổi trả 7 ngày.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cam Kết An Toàn & Hướng Dẫn Kiểm Tra Chính Hãng */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-3 flex items-center gap-2">
                <span>🛡️</span> Cách Nhận Biết Bình {product.name} Chính Hãng
              </h2>
              <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="font-black text-[#FF5722]">1.</span>
                  <span>
                    <strong>Nguyên màng co niêm phong & tem QR:</strong> Cổ van bình {product.name} còn nguyên màng co nhiệt của hãng {brandName} và tem chống giả kiểm định.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-black text-[#FF5722]">2.</span>
                  <span>
                    <strong>Kiểm tra trọng lượng chuẩn:</strong> Trọng lượng vỏ bình được dập nổi trên tay xách. Khi cộng thêm {weight} ruột gas sẽ ra đúng tổng số ký thực tế của bình.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-black text-[#FF5722]">3.</span>
                  <span>
                    <strong>Vỏ bình mới, còn hạn kiểm định:</strong> Không rỉ sét chân đế, thông số hạn kiểm định dập trên quai bình còn hiệu lực lưu hành.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-black text-[#FF5722]">4.</span>
                  <span>
                    <strong>Thử rò rỉ bọt xà phòng tại chỗ:</strong> Nhân viên Gas Nhà Mình luôn thử kín cổ van bằng nước xà phòng và bật thử bếp lên lửa xanh trước khi bàn giao.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏠</span> Vì Sao Gia Đình Chọn Đổi {product.name} Tại Gas Nhà Mình?
                </h2>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      <strong>Có mặt sau 15 phút:</strong> 5 trạm kho trực ban tại Quận 8, Tân Phú, Quận 6, Hóc Môn (Bà Điểm & Tân Hiệp) giao ngay không để gián đoạn bữa cơm gia đình.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      <strong>Hỗ trợ đổi ngang mọi loại vỏ 0đ:</strong> Chuyển từ vỏ bình cũ hãng khác sang {product.name} hoàn toàn miễn phí.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      <strong>Chăm sóc bếp định kỳ miễn phí:</strong> Thay ron cao su van gas, kiểm tra dây dẫn chống chuột cắn và chỉnh gió bếp gas tiết kiệm nhiên liệu.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      <strong>Thanh toán linh hoạt:</strong> Tiền mặt, chuyển khoản ngân hàng hoặc quét QR ngay tại nhà.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-orange-200/80 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-gray-500 block">Hết gas giữa chừng khi đang nấu ăn?</span>
                  <span className="text-sm font-bold text-gray-900">Gọi ngay Gas Nhà Mình:</span>
                </div>
                <a
                  href={HOTLINE_TEL}
                  className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  📞 {HOTLINE_DISPLAY}
                </a>
              </div>
            </div>
          </section>

          {/* Câu Hỏi Thường Gặp (FAQs) */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
              Giải Đáp Thắc Mắc Khi Đổi Bình {product.name}
            </h2>
            <div className="space-y-3.5">
              {faqItems.map((faq, idx) => (
                <details
                  key={idx}
                  open={idx === 0}
                  className="group bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-200 open:bg-orange-50/40 open:border-orange-200 transition-all"
                >
                  <summary className="font-bold text-gray-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-3">
                    <span>{faq.question}</span>
                    <span className="text-[#FF5722] group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Liên Kết Nội Bộ: Các Dòng Bình Gas Chính Hãng Khác */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  Các Dòng Bình Gas Chính Hãng Khác Tại Gas Nhà Mình
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Xem thêm bảng giá các dòng bình 12kg gia đình & 45kg công nghiệp đang có sẵn tại kho:
                </p>
              </div>
              <Link
                href="/bang-gia"
                className="text-xs sm:text-sm font-bold text-[#FF5722] hover:underline whitespace-nowrap"
              >
                Xem toàn bộ bảng giá hôm nay →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {otherProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group bg-gray-50 hover:bg-orange-50/50 rounded-xl border border-gray-200 hover:border-orange-300 p-3.5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square w-full bg-white rounded-lg border border-gray-100 p-2 mb-2.5 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">
                      {item.brand} • {item.weight}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#FF5722] mt-0.5 line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200/70 flex items-center justify-between">
                    <span className="text-sm font-black text-[#FF5722]">{item.price}</span>
                    <span className="text-[11px] font-bold text-gray-500 group-hover:text-[#FF5722]">
                      Đặt mua →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Liên Kết Nội Bộ: Mạng Lưới Giao Nhanh 21 Quận Huyện */}
          <section className="bg-gray-100/80 rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-2">
              Mạng Lưới Giao Bình {product.name} Tận Nhà 15 Phút Tại TP.HCM
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-5">
              Chọn khu vực của bạn để xem chi nhánh Gas Nhà Mình phụ trách giao nhanh nhất:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {districts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/giao-gas/${d.slug}`}
                  className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-2.5 text-center transition-all group shadow-2xs"
                >
                  <span className="block font-bold text-xs text-gray-800 group-hover:text-[#FF5722]">
                    Giao gas {d.name}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    Giao {d.slaMinutes}P
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
