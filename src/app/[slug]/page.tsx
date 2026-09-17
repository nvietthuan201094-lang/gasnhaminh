import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import { getDistrictBySlug, BRAND_NAME } from '@/lib/districts';
import ClientCheckoutWrapper from './ClientCheckoutWrapper';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';

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

  const canonicalUrl = `${siteUrl}/${slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${product.name} Chính Hãng | Giao Gas Siêu Tốc TP.HCM – ${BRAND_NAME}`,
    description: product.description || `Mua ${product.name} chính hãng, giá tốt, giao hàng tận nơi nhanh chóng trong 15–20 phút tại TP.HCM. Hotline: 0888 113 831.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} Chính Hãng | ${BRAND_NAME}`,
      description: product.description || `Mua ${product.name} chính hãng, giá tốt, giao hàng nhanh 15–20 phút.`,
      url: canonicalUrl,
      type: 'website',
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Nếu slug là đường dẫn quận (ví dụ /giao-gas-quan-7 hoặc /quan-7), chuyển hướng 308 Permanent Redirect sang /giao-gas/quan-7 chuẩn SEO
  const district = getDistrictBySlug(slug);
  if (district) {
    permanentRedirect(`/giao-gas/${district.slug}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Đặt mua sản phẩm
          </h1>
          <p className="text-gray-500 text-lg">
            Vui lòng chọn số lượng và điền thông tin để chúng tôi giao hàng sớm nhất.
          </p>
        </div>
        
        <ClientCheckoutWrapper product={product} />
      </div>
    </div>
  );
}
