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
 * Lấy động bảng giá gas từ Backend CRM Gas Nhà Mình (theo Bảng giá thương hiệu).
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

    // Map giá đã tính toán từ Bảng giá thương hiệu (Pricelist ID 2 trên CRM Gas Nhà Mình)
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
      const crmProductId = ID_BY_SLUG[prod.slug];
      if (crmProductId && priceMap.has(crmProductId)) {
        const crmItem = priceMap.get(crmProductId)!;
        const exchangeVal = crmItem.price > 0 ? crmItem.price : crmItem.lst_price;
        const depositVal = depositMap.get(crmProductId) || (prod.category === 'cong-nghiep' ? 1000000 : 250000);
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



