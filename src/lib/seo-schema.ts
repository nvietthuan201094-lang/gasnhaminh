/**
 * Schema.org SEO Structured Data generator for Products & Offers
 * Compliant with Google Search Console & Google Rich Results guidelines:
 * - Strictly reflects visible content on page (No fabricated ratings or fake reviews)
 * - Accurate shipping details (0 VND fast delivery in HCMC)
 * - Real LPG monthly price validity cycle (validFrom & priceValidUntil)
 * - Transparent placeholders for real user reviews/ratings when available
 */

export interface ProductReview {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: number;
}

export interface ProductAggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

/**
 * Chu kỳ giá gas LPG tại Việt Nam được điều chỉnh và công bố vào ngày 1 hàng tháng.
 * Do đó validFrom là ngày đầu tháng hiện tại, priceValidUntil là ngày cuối tháng hiện tại.
 */
export function getLpgPriceValidityDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const validFrom = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const priceValidUntil = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { validFrom, priceValidUntil };
}

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
  validFrom,
  priceValidUntil,
  sellerName = 'Gas Nhà Mình',
  returnPolicy,
}: {
  url: string;
  price: number | string;
  validFrom?: string;
  priceValidUntil?: string;
  sellerName?: string;
  returnPolicy?: object;
}) {
  const numericPrice =
    typeof price === 'number'
      ? price
      : parseInt(String(price).replace(/\D/g, ''), 10) || 0;

  const defaultDates = getLpgPriceValidityDates();

  return {
    '@type': 'Offer',
    url,
    price: numericPrice,
    priceCurrency: 'VND',
    priceValidUntil: priceValidUntil || defaultDates.priceValidUntil,
    validFrom: validFrom || defaultDates.validFrom,
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: sellerName,
    },
    shippingDetails: DEFAULT_SHIPPING_DETAILS,
    ...(returnPolicy ? { hasMerchantReturnPolicy: returnPolicy } : {}),
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
  validFrom,
  priceValidUntil,
  location,
  sellerName = 'Gas Nhà Mình',
  returnPolicy,
  aggregateRating,
  reviews,
}: {
  position?: number;
  name: string;
  description: string;
  image: string | string[];
  sku: string;
  brand: string;
  url: string;
  price: number | string;
  validFrom?: string;
  priceValidUntil?: string;
  location?: string;
  sellerName?: string;
  returnPolicy?: object;
  aggregateRating?: ProductAggregateRating;
  reviews?: ProductReview[];
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
    ...(aggregateRating && aggregateRating.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: aggregateRating.bestRating || 5,
            worstRating: aggregateRating.worstRating || 1,
          },
        }
      : {}),
    ...(reviews && reviews.length > 0
      ? {
          review: reviews.map((r) => ({
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: r.author,
            },
            datePublished: r.datePublished,
            reviewBody: r.reviewBody,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.reviewRating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : {}),
    offers: createProductOffer({
      url,
      price,
      validFrom,
      priceValidUntil,
      sellerName,
      returnPolicy,
    }),
  };
}
