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

function getTrackingData(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const tracking: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'fbc', 'fbp', 'ttclid'].forEach((param) => {
      const val = searchParams.get(param);
      if (val) tracking[param] = val;
    });

    if (document.referrer) {
      tracking['referrer'] = document.referrer;
    }

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const gaCookie = getCookie('_ga');
    if (gaCookie) {
      const parts = gaCookie.split('.');
      tracking['ga_client_id'] = parts.length >= 4 ? `${parts[2]}.${parts[3]}` : gaCookie;
    }
    const fbcCookie = getCookie('_fbc');
    if (fbcCookie) tracking['fbc'] = fbcCookie;
    const gclCookie = getCookie('_gcl_aw');
    if (gclCookie) tracking['gclid'] = gclCookie;

    // Tự động phân tích nguồn và kênh chuẩn Marketing nếu chưa có UTM rõ ràng
    if (!tracking['utm_source']) {
      if (tracking['gclid']) {
        tracking['utm_source'] = 'google';
        tracking['utm_medium'] = 'cpc';
        tracking['utm_campaign'] = tracking['utm_campaign'] || 'Chiến dịch Google Ads';
      } else if (tracking['fbclid'] || tracking['fbc']) {
        tracking['utm_source'] = 'facebook';
        tracking['utm_medium'] = 'cpc';
        tracking['utm_campaign'] = tracking['utm_campaign'] || 'Chiến dịch Facebook Ads';
      } else if (tracking['ttclid']) {
        tracking['utm_source'] = 'tiktok';
        tracking['utm_medium'] = 'cpc';
        tracking['utm_campaign'] = tracking['utm_campaign'] || 'Chiến dịch TikTok Ads';
      } else if (document.referrer) {
        const ref = document.referrer.toLowerCase();
        if (ref.includes('google.com') || ref.includes('google.com.vn')) {
          tracking['utm_source'] = 'google';
          tracking['utm_medium'] = 'organic';
          tracking['utm_campaign'] = 'SEO Tự Nhiên (Google)';
        } else if (ref.includes('coccoc.com')) {
          tracking['utm_source'] = 'coccoc';
          tracking['utm_medium'] = 'organic';
          tracking['utm_campaign'] = 'SEO Tự Nhiên (Cốc Cốc)';
        } else if (ref.includes('bing.com')) {
          tracking['utm_source'] = 'bing';
          tracking['utm_medium'] = 'organic';
          tracking['utm_campaign'] = 'SEO Tự Nhiên (Bing)';
        } else if (ref.includes('facebook.com') || ref.includes('fb.com')) {
          tracking['utm_source'] = 'facebook';
          tracking['utm_medium'] = 'social';
          tracking['utm_campaign'] = 'Mạng xã hội (Facebook)';
        } else if (ref.includes('zalo.me')) {
          tracking['utm_source'] = 'zalo';
          tracking['utm_medium'] = 'social';
          tracking['utm_campaign'] = 'Mạng xã hội (Zalo)';
        } else if (!ref.includes(window.location.hostname)) {
          try {
            const host = new URL(document.referrer).hostname;
            tracking['utm_source'] = host;
            tracking['utm_medium'] = 'referral';
            tracking['utm_campaign'] = 'Web giới thiệu';
          } catch (_) {}
        }
      } else {
        tracking['utm_source'] = 'direct';
        tracking['utm_medium'] = 'direct';
        tracking['utm_campaign'] = 'Truy cập trực tiếp';
      }
    }

    const saved = localStorage.getItem('gas_tracking_data');
    let merged = saved ? { ...JSON.parse(saved), ...tracking } : tracking;
    if (Object.keys(merged).length > 0) {
      localStorage.setItem('gas_tracking_data', JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    return {};
  }
}

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  try {
    const orderData = {
      customer_name: payload.customerName || 'Khách hàng Landing Page',
      customer_phone: payload.customerPhone,
      address: payload.customerAddress,
      district_code: payload.districtCode || '',
      notes: payload.note || '',
      source_domain: typeof window !== 'undefined' ? window.location.hostname : 'gasnhaminh.com',
      lines: [
        {
          product_slug: payload.slug || `product-${payload.productId}`,
          qty: payload.quantity,
          cylinder_action: payload.cylinderAction || 'exchange'
        }
      ],
      referral_code: payload.referralCode || '',
      tracking: getTrackingData()
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
      orderName: json.order_name || json.order_id?.toString() || '',
      message: json.message
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, message: 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.' };
  }
}

/**
 * Gửi tín hiệu tương tác (Khách bấm Gọi Hotline hoặc Chat Zalo) về Server CRM Odoo
 * để kích hoạt thông báo đẩy FCM tức thì tới điện thoại nhân viên.
 */
export async function trackInteractionApi(
  event: 'click_zalo' | 'click_call',
  extra?: {
    district?: string;
    phone?: string;
    customerPhone?: string;
    customerName?: string;
    notes?: string;
  }
): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const domain = window.location.hostname || 'gasnhaminh.com';
    const tracking = getTrackingData();
    const payload = {
      event,
      domain,
      phone: extra?.phone || '0888 113 831',
      district: extra?.district || '',
      customer_phone: extra?.customerPhone || '',
      customer_name: extra?.customerName || '',
      notes: extra?.notes || '',
      url: window.location.href,
      tracking,
    };

    const endpoint = `${API_BASE_URL}/api/v1/tracking/interaction`;
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (err) {
    console.error('[API] Error tracking interaction:', err);
  }
}

