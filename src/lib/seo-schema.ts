/**
 * Schema.org SEO Structured Data generator for Products & Offers
 * Compliant with Google Search Console & Google Rich Results guidelines:
 * - Strictly reflects visible content on page (No fabricated ratings or fake reviews)
 * - Accurate shipping details (0 VND fast delivery in HCMC)
 * - Clean offers without unverified return claims or fake MPNs
 */

export const DEFAULT_SHIPPING_DETAILS = {
  '@type': 'OfferShippingDetails',
  shippingRate: {
    '@type': 'MonetaryAmount',
    value: 0,
    currency: 'VND',
  },
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'VN',
    addressRegion: 'Thành phố Hồ Chí Minh',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 0,
      maxValue: 0,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: 0,
      maxValue: 1,
      unitCode: 'DAY',
    },
  },
};

export function createProductOffer({
  url,
  price,
  sellerName = 'Gas Nhà Mình',
}: {
  url: string;
  price: number | string;
  sellerName?: string;
}) {
  const numericPrice =
    typeof price === 'number'
      ? price
      : parseInt(String(price).replace(/\D/g, ''), 10) || 0;

  return {
    '@type': 'Offer',
    url,
    price: numericPrice,
    priceCurrency: 'VND',
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: sellerName,
    },
    shippingDetails: DEFAULT_SHIPPING_DETAILS,
  };
}

export function createProductSchema({
  position,
  name,
  description,
  image,
  sku,
  brand,
  url,
  price,
  sellerName = 'Gas Nhà Mình',
}: {
  position?: number;
  name: string;
  description: string;
  image: string | string[];
  sku: string;
  brand: string;
  url: string;
  price: number | string;
  location?: string;
  sellerName?: string;
}) {
  return {
    '@type': 'Product',
    ...(position !== undefined ? { position } : {}),
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: createProductOffer({ url, price, sellerName }),
  };
}
