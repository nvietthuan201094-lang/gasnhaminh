import { OrderPayload, OrderResponse, Product } from '@/types/order';
import { SEO_PRODUCTS, SeoProductItem } from '@/lib/districts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://crm.gasnhaminh.com';

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

  const seoProd = SEO_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const targetSlug = SLUG_ALIASES[slug] || slug;

  try {
    let res = await fetch(`${API_BASE_URL}/api/v1/products/${targetSlug}`, { next: { revalidate: 60 } });
    if (!res.ok && targetSlug !== slug) {
      res = await fetch(`${API_BASE_URL}/api/v1/products/${slug}`, { next: { revalidate: 60 } });
    }
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return {
          ...json.data,
          name: seoProd?.name || json.data.name,
          price: seoProd ? seoProd.priceVal : json.data.price,
          description: seoProd?.desc || json.data.description,
          imageUrl: json.data.imageUrl || seoProd?.image,
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }

  if (seoProd) {
    return {
      id: seoProd.id,
      name: seoProd.name,
      slug: seoProd.slug,
      price: seoProd.priceVal,
      description: seoProd.desc,
      imageUrl: seoProd.image,
    };
  }
  return null;
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

let isOrderSubmitting = false;
let lastOrderPayloadHash = '';
let lastOrderTimestamp = 0;
let lastOrderCachedResponse: OrderResponse | null = null;

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  const currentHash = `${payload.customerPhone}_${payload.slug || payload.productId}_${payload.customerAddress || ''}_${payload.cylinderAction || ''}`;
  const now = Date.now();

  // Deduplicate rapid double submissions (within 5 seconds)
  if (isOrderSubmitting) {
    console.warn('[API] Order submission already in flight, ignoring duplicate submission.');
    if (lastOrderCachedResponse) return lastOrderCachedResponse;
    return { success: false, message: 'Đơn hàng đang được xử lý, vui lòng không gửi lại liên tục.' };
  }

  if (currentHash === lastOrderPayloadHash && now - lastOrderTimestamp < 5000) {
    console.warn('[API] Duplicate order detected within 5 seconds, reusing previous response.');
    if (lastOrderCachedResponse) return lastOrderCachedResponse;
    return { success: true, message: 'Đơn hàng của bạn đã được tiếp nhận thành công.' };
  }

  isOrderSubmitting = true;
  lastOrderPayloadHash = currentHash;
  lastOrderTimestamp = now;

  // Persist customer phone and name to localStorage for future caller/interaction tracking
  if (typeof window !== 'undefined') {
    try {
      if (payload.customerPhone) {
        localStorage.setItem('gas_customer_phone', payload.customerPhone);
      }
      if (payload.customerName) {
        localStorage.setItem('gas_customer_name', payload.customerName);
      }
    } catch (_) {}
  }

  try {
    const orderData = {
      customer_name: (payload.customerName && payload.customerName.trim()) || 'Khách đặt nhanh 1 chạm',
      customer_phone: payload.customerPhone,
      address: (payload.customerAddress && payload.customerAddress.trim()) || 'Xác nhận địa chỉ qua SĐT trong 30 giây',
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
    
    const result: OrderResponse = {
      success: json.status === 'success',
      orderId: json.order_id?.toString() || '',
      orderName: json.order_name || json.order_id?.toString() || '',
      message: json.message
    };
    lastOrderCachedResponse = result;
    return result;
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, message: 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.' };
  } finally {
    isOrderSubmitting = false;
  }
}

// In-memory cooldown map to prevent duplicate notification firing when clicking Call or Zalo
const interactionCooldownMap = new Map<string, number>();

/**
 * Gửi tín hiệu tương tác (Khách bấm Gọi Hotline hoặc Chat Zalo) về Server CRM Gas Nhà Mình
 * để kích hoạt thông báo đẩy FCM tức thì tới điện thoại nhân viên.
 * 
 * Đã tối ưu debounce 2.5s và loại bỏ sendBeacon fallback kép để triệt tiêu lỗi x2 thông báo.
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

  const now = Date.now();
  const dedupKey = `${event}_${extra?.phone || ''}`;
  const lastTime = interactionCooldownMap.get(dedupKey) || 0;

  // Chặn gửi trùng lặp nếu người dùng nhấn liên tiếp trong vòng 2.5 giây
  if (now - lastTime < 2500) {
    console.debug(`[API] Debounced duplicate interaction: ${dedupKey}`);
    return;
  }
  interactionCooldownMap.set(dedupKey, now);

  try {
    const domain = window.location.hostname || 'gasnhaminh.com';
    let tracking = {};
    try {
      tracking = getTrackingData();
    } catch (_) {}

    // Tự động lấy số điện thoại khách hàng nếu đã từng nhập trên form hoặc đơn hàng
    let customerPhone = extra?.customerPhone || '';
    let customerName = extra?.customerName || '';
    try {
      if (!customerPhone) {
        customerPhone = localStorage.getItem('gas_customer_phone') || '';
      }
      if (!customerName) {
        customerName = localStorage.getItem('gas_customer_name') || '';
      }
    } catch (_) {}

    const payload = {
      event,
      domain,
      phone: extra?.phone || '0888 113 831',
      district: extra?.district || '',
      customer_phone: customerPhone,
      customer_name: customerName,
      notes: extra?.notes || '',
      url: window.location.href,
      tracking,
    };

    const endpoint = `${API_BASE_URL}/api/v1/tracking/interaction`;
    const jsonStr = JSON.stringify(payload);

    // Luôn dùng fetch với keepalive: true và mode: 'cors'.
    // KHÔNG dùng navigator.sendBeacon trong .catch vì khi mở link tel: hoặc zalo.me,
    // trình duyệt điều hướng gây abort promise JS cục bộ nhưng request keepalive vẫn được mạng gửi đi.
    // Nếu gọi thêm sendBeacon sẽ sinh ra 2 request đồng thời gây x2 thông báo chuông.
    if (typeof fetch === 'function') {
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
          console.debug('[API] Track interaction dispatched via keepalive fetch.');
        });
      } catch (e) {
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([jsonStr], { type: 'text/plain' });
          navigator.sendBeacon(endpoint, blob);
        }
      }
    } else if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([jsonStr], { type: 'text/plain' });
      navigator.sendBeacon(endpoint, blob);
    }
  } catch (err) {
    console.error('[API] Error tracking interaction:', err);
  }
}

/**
 * Trả về bảng giá niêm yết chuẩn đã khóa cứng trên Web (V-Gas 530.000đ, Petrolimex 595.000đ–605.000đ),
 * đảm bảo không bị giá cũ trên CRM ghi đè sau khi tải trang.
 */
export async function fetchDynamicGasPrices(): Promise<SeoProductItem[]> {
  return SEO_PRODUCTS;
}



