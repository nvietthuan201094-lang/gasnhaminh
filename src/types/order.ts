export interface Product {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
}

export interface OrderPayload {
  productId: string;
  slug?: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note?: string;
  cylinderAction?: 'exchange' | 'new';
  referralCode?: string;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message?: string;
}
