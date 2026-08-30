import { OrderPayload, OrderResponse, Product } from '@/types/order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://crm.posplus.vn';

export async function fetchProducts(domain: string = ''): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products?domain=${domain}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.status === 'success' ? json.data : [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.status === 'success' ? json.data : null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  try {
    const orderData = {
      customer_name: payload.customerName || 'Khách hàng Landing Page',
      customer_phone: payload.customerPhone,
      address: payload.customerAddress,
      notes: payload.note || '',
      lines: [
        {
          product_slug: payload.slug || `product-${payload.productId}`,
          qty: payload.quantity,
          cylinder_action: payload.cylinderAction || 'exchange'
        }
      ],
      referral_code: payload.referralCode || ''
    };

    const res = await fetch(`${API_BASE_URL}/api/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    
    return {
      success: json.status === 'success',
      orderId: json.order_id?.toString() || '',
      message: json.message
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, message: 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.' };
  }
}
