import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDistrictBySlug, getAllDistricts, getDistrictKeywords, BRAND_NAME, SEO_PRODUCTS } from '@/lib/districts';
import { createProductSchema } from '@/lib/seo-schema';
import DistrictLandingView from '@/components/DistrictLandingView';

interface PageProps {
  params: Promise<{
    district: string;
  }>;
}

/**
 * Pre-render tất cả các quận huyện khi build để tối ưu SEO và tốc độ tải trang
 */
export async function generateStaticParams() {
  const districts = getAllDistricts();
  return districts.map((d) => ({
    district: d.slug,
  }));
}

/**
 * Tối ưu hoá On-page SEO Metadata chuyên biệt cho từng quận của Gas Nhà Mình
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { district: slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    return {
      title: `Khu vực giao gas | ${BRAND_NAME}`,
    };
  }

  const newWardsClean = (district.newWards || [])
    .map((w) => w.replace(/\s*\(.*?\)\s*/g, '').replace(/^(Phường|Xã)\s+/i, '').trim())
    .slice(0, 3)
    .join(', ');

  const title = `Đổi Bình Gas, Giao Gas ${district.name} 15P | ${BRAND_NAME}`;
  const description = `Đổi bình gas 12kg, 45kg chính hãng giao tận nhà tại ${district.name} trong ${district.slaMinutes} phút${newWardsClean ? ` (phường ${newWardsClean})` : ''}. Đủ ký, nguyên tem chống giả. Hotline: ${district.hotline}.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';
  const canonicalUrl = `${siteUrl}/giao-gas/${district.slug}`;

  return {
    title,
    description,
    keywords: getDistrictKeywords(district, BRAND_NAME),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: '/hero_gasnhaminh.jpg',
          width: 1200,
          height: 630,
          alt: `Giao gas, gọi gas, đặt gas ${district.name} - ${BRAND_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero_gasnhaminh.jpg'],
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { district: slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';
  const pageUrl = `${siteUrl}/giao-gas/${district.slug}`;

  const wardNames = Array.from(
    new Set([
      ...(district.newWards || []).map((w) => w.replace(/\s*\(.*?\)\s*/g, '').trim()),
      ...district.popularWards.map((w) => w.replace(/\s*\(.*?\)\s*/g, '').trim()),
    ])
  );
  const newWardsText = (district.newWards || [])
    .map((w) => w.replace(/\s*\(.*?\)\s*/g, '').trim())
    .join(', ');

  // Structured Data Schema JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${pageUrl}#business`,
        name: `Đại Lý Giao Gas, Gọi Gas, Đặt Gas ${district.name} - ${BRAND_NAME}`,
        description: district.description,
        url: pageUrl,
        image: `${siteUrl}/logo.png`,
        telephone: district.hotline,
        priceRange: '500.000đ - 1.730.000đ',
        address: {
          '@type': 'PostalAddress',
          streetAddress: district.hubName,
          addressLocality: district.name,
          addressRegion: 'Thành phố Hồ Chí Minh',
          postalCode: '700000',
          addressCountry: 'VN',
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: district.fullName,
          },
          ...wardNames.map((ward) => ({
            '@type': 'AdministrativeArea',
            name: `${ward}, ${district.name}`,
          })),
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '06:00',
          closes: '22:00',
        },
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
            name: 'Mạng lưới giao gas TP.HCM',
            item: `${siteUrl}/#khu-vuc`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Giao gas, gọi gas, đặt gas ${district.name}`,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#products`,
        name: `Bảng giá bình gas chính hãng Gas Nhà Mình tại ${district.name}`,
        itemListElement: SEO_PRODUCTS.map((prod, idx) => {
          const defaultPrice = prod.priceVal || (prod.weight === '45kg' ? 1730000 : 530000);
          const productPrice = prod.priceVal > 0 ? prod.priceVal : defaultPrice;
          return createProductSchema({
            position: idx + 1,
            name: `${prod.name} tại ${district.name}`,
            description: prod.desc,
            image: prod.image || '/hero_gasnhaminh.jpg',
            sku: `${prod.slug}-${district.slug}`,
            brand: prod.brand,
            url: `${siteUrl}/${prod.slug}`,
            price: productPrice,
            location: district.name,
            sellerName: BRAND_NAME,
          });
        }),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Thời gian giao gas, gọi gas, đặt gas tại ${district.name} (bao gồm các phường mới) mất bao lâu?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Nhờ trạm giao hàng thường trực tại ${district.hubName}, thời gian giao gas của Gas Nhà Mình tại ${district.name}${newWardsText ? ` (bao gồm các phường/xã mới sáp nhập: ${newWardsText})` : ''} và toàn bộ các tuyến đường chỉ từ ${district.slaMinutes} phút kể từ khi quý khách đặt gas online hoặc gọi hotline ${district.hotline}.`,
            },
          },
          {
            '@type': 'Question',
            name: `Gas Nhà Mình tại ${district.name} có những loại bình gas nào? Có bình gas bò 45kg không?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Chúng tôi cung ứng đầy đủ 11 dòng bình gas chính hãng: V-Gas (xám, đỏ, vàng, xanh đen, V-Gas PE bọc nhựa chống va đập, V-Gas Shell van chụp), Petrolimex (van đứng, van chụp Shell), Tuấn Khang (vàng, xanh) 12kg và bình gas bò 45kg công nghiệp chuyên dụng cho nhà hàng, quán ăn.`,
            },
          },
          {
            '@type': 'Question',
            name: `Tôi có được cân đối chứng kiểm tra trọng lượng bình gas không? Làm sao biết bình đủ 12kg ruột?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Bình gas 12kg gia đình tại ${district.name} được chiết nạp tự động chuẩn xác đủ 12kg ruột gas lỏng và niêm phong màng co nhiệt chính hãng. Trọng lượng vỏ bình được dập nổi rõ ràng trên quai xách (tổng trọng lượng chuẩn = số kg vỏ dập nổi + 12kg ruột). Kỹ thuật viên sẽ cùng quý khách kiểm tra nguyên tem chống giả, hạn kiểm định vỏ bình và thử rò rỉ bọt xà phòng. Nếu gia đình có sẵn cân tại nhà, quý khách hoàn toàn có thể kiểm tra đối chứng trước khi nhận bình.`,
            },
          },
          {
            '@type': 'Question',
            name: `Đổi bình gas tại ${district.name} có được hỗ trợ kiểm tra van dây và an toàn không?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `100% bình gas phân phối tại ${district.name} là hàng chính hãng có tem kiểm định an toàn của nhà sản xuất. Kỹ thuật viên giao gas hỗ trợ kiểm tra rò rỉ gas bằng bọt xà phòng hoặc thiết bị dò khí chuyên dụng, thay gioăng cao su van miễn phí trước khi bàn giao.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DistrictLandingView district={district} />
    </>
  );
}
