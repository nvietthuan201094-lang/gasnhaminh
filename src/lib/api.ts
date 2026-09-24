import { OrderPayload, OrderResponse, Product } from '@/types/order';
import { SEO_PRODUCTS, SeoProductItem } from '@/lib/districts';

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
  const SLUG_ALIASES: Record<string, string> = {
    'gas-v-gas-do-12kg': 'gas-v-gas-do-12-kg',
    'gas-bo-45kg': 'gas-bo-45-kg',
  };

  const targetSlug = SLUG_ALIASES[slug] || slug;

  try {
    let res = await fetch(`${API_BASE_URL}/api/v1/products/${targetSlug}`, { next: { revalidate: 60 } });
    if (!res.ok && targetSlug !== slug) {
      res = await fetch(`${API_BASE_URL}/api/v1/products/${slug}`, { next: { revalidate: 60 } });
    }
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
    let tracking = {};
    try {
      tracking = getTrackingData();
    } catch (_) {}

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
    const jsonStr = JSON.stringify(payload);

    // 1. Luôn ưu tiên dùng fetch với keepalive: true và mode: 'cors'
    // Chuẩn W3C hiện đại nhất, vượt qua CORS sạch sẽ mà không bị trình duyệt chặn ngầm như sendBeacon + JSON Blob
    try {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonStr,
        keepalive: true,
        mode: 'cors',
      }).catch((fetchErr) => {
        console.warn('[API] Track interaction fetch failed, trying beacon fallback:', fetchErr);
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([jsonStr], { type: 'text/plain' });
          navigator.sendBeacon(endpoint, blob);
        }
      });
    } catch (e) {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([jsonStr], { type: 'text/plain' });
        navigator.sendBeacon(endpoint, blob);
      }
    }
  } catch (err) {
    console.error('[API] Error tracking interaction:', err);
  }
}

/**
 * Lấy động bảng giá gas từ Backend Odoo CRM (theo Bảng giá Gas Tuấn Khang).
 * Tự động đồng bộ giá bán lẻ, tiền cọc vỏ bình và fallback về giá mặc định nếu sản phẩm không nằm trong bảng giá.
 */
export async function fetchDynamicGasPrices(): Promise<SeoProductItem[]> {
  try {
    const [productsRes, crmPricelistRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/v1/products`, { next: { revalidate: 60 } }).then((r) => r.json()).catch(() => null),
      fetch(`${API_BASE_URL}/api/v1/crm/products?pricelist_id=2`, { next: { revalidate: 60 } }).then((r) => r.json()).catch(() => null),
    ]);

    const apiProducts: any[] = productsRes?.data || [];
    const crmProducts: any[] = crmPricelistRes?.data || [];

    // Map giá đã tính toán từ Bảng giá Gas Tuấn Khang (Pricelist ID 2 trên Odoo)
    const priceMap = new Map<number, { price: number; lst_price: number }>();
    crmProducts.forEach((cp) => {
      if (cp.id) priceMap.set(cp.id, { price: cp.price, lst_price: cp.lst_price });
    });

    // Map tiền thế chân cọc vỏ bình
    const depositMap = new Map<number, number>();
    apiProducts.forEach((p) => {
      if (p.id) depositMap.set(p.id, p.deposit_price || 0);
    });

    const ID_BY_SLUG: Record<string, number> = {
      'gas-v-gas-xam-12kg': 168,
      'gas-v-gas-do-12kg': 172,
      'gas-v-gas-vang-12kg': 174,
      'gas-v-gas-xanh-den-12kg': 173,
      'gas-v-gas-pe-12kg': 178,
      'gas-v-gas-shell-12kg': 177,
      'gas-petrolimex-dung-12kg': 175,
      'gas-petrolimex-shell-12kg': 176,
      'gas-tuan-khang-vang-12kg': 169,
      'gas-tuan-khang-xanh-12kg': 171,
      'gas-bo-45kg': 170,
    };

    const formatVND = (num: number) =>
      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace('₫', 'đ');

    return SEO_PRODUCTS.map((prod) => {
      const odooId = ID_BY_SLUG[prod.slug];
      if (odooId && priceMap.has(odooId)) {
        const crmItem = priceMap.get(odooId)!;
        const exchangeVal = crmItem.price > 0 ? crmItem.price : crmItem.lst_price;
        const depositVal = depositMap.get(odooId) || (prod.category === 'cong-nghiep' ? 1000000 : 250000);
        const newVal = exchangeVal + depositVal;

        return {
          ...prod,
          priceVal: exchangeVal,
          price: formatVND(exchangeVal),
          newPriceVal: newVal,
          newPrice: formatVND(newVal),
        };
      }
      return prod;
    });
  } catch (error) {
    console.error('Lỗi khi lấy bảng giá động từ BE:', error);
    return SEO_PRODUCTS;
  }
}



