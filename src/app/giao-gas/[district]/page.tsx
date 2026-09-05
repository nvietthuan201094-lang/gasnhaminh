import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDistrictBySlug, getAllDistricts, getDistrictKeywords, BRAND_NAME, SEO_PRODUCTS } from '@/lib/districts';
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

  const title = `Giao Gas, Đặt Gas, Gọi Gas ${district.name} Siêu Tốc ${district.slaMinutes} Phút | ${BRAND_NAME}`;
  const description = `Đại lý Gas Nhà Mình tại ${district.fullName}. Đặt gas online, gọi đổi gas giao tận nhà trong ${district.slaMinutes} phút. Đầy đủ bình V-Gas xám/đỏ/vàng/PE/Shell, Petrolimex đứng/shell, Tuấn Khang vàng 12kg và gas bò 45kg. Cân đối chứng tại nhà. Hotline: ${district.hotline}.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gasnhaminh.com';
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
          url: 'https://images.unsplash.com/photo-1736960894843-bc9afe9b22c9?w=1200&h=630&fit=crop&auto=format',
          width: 1200,
          height: 630,
          alt: `Giao gas ${district.name} - ${BRAND_NAME}`,
        },
      ],
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { district: slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gasnhaminh.com';
  const pageUrl = `${siteUrl}/giao-gas/${district.slug}`;

  // Structured Data Schema JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${pageUrl}#business`,
        name: `Đại Lý Giao Gas, Đặt Gas ${district.name} - ${BRAND_NAME}`,
        description: district.description,
        url: pageUrl,
        telephone: district.hotline,
        priceRange: '420.000đ - 465.000đ',
        address: {
          '@type': 'PostalAddress',
          addressLocality: district.name,
          addressRegion: 'TP. Hồ Chí Minh',
          addressCountry: 'VN',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: district.fullName,
        },
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
            name: `Giao gas ${district.name}`,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#products`,
        name: `Bảng giá bình gas chính hãng Gas Nhà Mình tại ${district.name}`,
        itemListElement: SEO_PRODUCTS.map((prod, idx) => ({
          '@type': 'Product',
          position: idx + 1,
          name: `${prod.name} tại ${district.name}`,
          description: prod.desc,
          brand: {
            '@type': 'Brand',
            name: prod.brand,
          },
          offers: {
            '@type': 'Offer',
            price: prod.priceVal > 0 ? prod.priceVal : undefined,
            priceCurrency: 'VND',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: BRAND_NAME,
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Thời gian giao gas của Gas Nhà Mình tại ${district.name} là bao lâu?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Thời gian giao gas tại ${district.name} trung bình từ ${district.slaMinutes} phút kể từ lúc xác nhận đơn hàng nhờ trạm phân phối tại ${district.hubName}, phục vụ tất cả các phường nội thành.`,
            },
          },
          {
            '@type': 'Question',
            name: `Gas Nhà Mình tại ${district.name} có giao các loại bình gas nào?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Chúng tôi cung cấp đủ 10 dòng sản phẩm: V-Gas xám, V-Gas đỏ, V-Gas vàng, V-Gas xanh đen, V-Gas PE bọc nhựa chống va đập, V-Gas Shell van chụp, Petrolimex van đứng, Petrolimex van chụp Shell, Tuấn Khang vàng 12kg và Gas bò 45kg công nghiệp.`,
            },
          },
          {
            '@type': 'Question',
            name: `Quy trình kiểm tra an toàn khi giao gas của Gas Nhà Mình?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Kỹ thuật viên mang theo cân điện tử kiểm tra đủ 12kg gas thực, thay gioăng cao su miễn phí, vệ sinh đầu đốt bếp và kiểm tra rò rỉ khí gas trước khi khách hàng thanh toán.`,
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
