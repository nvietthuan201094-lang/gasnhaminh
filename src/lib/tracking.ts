/**
 * Google Ads & Analytics Conversion Tracking Utility
 * 
 * Conversion ID: AW-18424275416
 * Conversion Label: efNKCO--rewcENjDsNFE
 */

export const DEFAULT_GOOGLE_ADS_ID = "AW-18424275416";
export const DEFAULT_GOOGLE_ADS_CONVERSION_LABEL = "efNKCO--rewcENjDsNFE";

export interface TrackingItem {
  id?: string | number;
  name: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export interface PurchaseTrackingPayload {
  transactionId: string | number;
  value: number;
  currency?: string;
  items?: TrackingItem[];
  googleAdsId?: string;
  conversionLabel?: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Ensures window.dataLayer and window.gtag are initialized
 */
function ensureGtag(): (...args: any[]) => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      window.dataLayer!.push(arguments);
    };
  }
  return window.gtag;
}

/**
 * Fires Google Ads Purchase Conversion and pushes GA4 eCommerce purchase event.
 * 
 * STRICT RULE: Only call this function AFTER backend order creation succeeds!
 */
export function trackGoogleAdsPurchase({
  transactionId,
  value,
  currency = "VND",
  items = [],
  googleAdsId = DEFAULT_GOOGLE_ADS_ID,
  conversionLabel = DEFAULT_GOOGLE_ADS_CONVERSION_LABEL,
}: PurchaseTrackingPayload) {
  if (typeof window === "undefined") return;

  const gtag = ensureGtag();
  const numericValue = Number(value) || 0;
  const txId = String(transactionId);
  const sendTo = `${googleAdsId}/${conversionLabel}`;

  try {
    // 1. Fire direct Google Ads conversion event via gtag
    gtag("event", "conversion", {
      send_to: sendTo,
      value: numericValue,
      currency: currency,
      transaction_id: txId,
    });

    // 2. Clear previous ecommerce object and push standard GA4 / GTM ecommerce purchase
    window.dataLayer!.push({ ecommerce: null });
    window.dataLayer!.push({
      event: "purchase",
      ecommerce: {
        transaction_id: txId,
        value: numericValue,
        currency: currency,
        items: items.map((item) => ({
          item_id: item.id ? String(item.id) : undefined,
          item_name: item.name,
          item_category: item.category || "Gas",
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        })),
      },
      // Explicit dataLayer fields for GTM Google Ads Conversion Tag (if used)
      google_ads_conversion: {
        id: googleAdsId.replace(/^AW-/, ""),
        conversion_id: googleAdsId,
        label: conversionLabel,
        value: numericValue,
        currency: currency,
        transaction_id: txId,
      },
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`[Tracking] Google Ads Purchase Conversion Fired:`, {
        send_to: sendTo,
        transaction_id: txId,
        value: numericValue,
        currency,
        itemsCount: items.length,
      });
    }
  } catch (err) {
    console.error("[Tracking] Error firing Google Ads conversion:", err);
  }
}

/**
 * Track interaction events (e.g. click call hotline, click zalo)
 */
export function trackInteraction(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const gtag = ensureGtag();
  try {
    gtag("event", eventName, params);
    window.dataLayer!.push({
      event: eventName,
      ...params,
    });
  } catch (err) {
    console.error("[Tracking] Error firing interaction event:", err);
  }
}
