import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import ClientCheckoutWrapper from './ClientCheckoutWrapper';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại | Đại lý Gas',
    };
  }

  return {
    title: `${product.name} | GAS NHÀ MÌNH | Đại lý Gas`,
    description: product.description || `Mua ${product.name} chính hãng, giá tốt, giao hàng tận nơi nhanh chóng trong 30 phút.`,
    openGraph: {
      title: `${product.name} | GAS NHÀ MÌNH`,
      description: product.description || `Mua ${product.name} chính hãng, giá tốt, giao hàng nhanh.`,
      type: 'website',
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
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
