import { Product } from './product';

export interface OrderItemResponse {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: string;
  quantity: number;
}

export interface OrderResponse {
  orderItems: OrderItemResponse[];
  user: { _id: string };
  status: string;
  totalPrice: number;
  phone: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
  _id: string;
}

export interface OrderRequest {
  orderItems: OrderItemResponse[];
  user: { _id: string };
  status: string;
  totalPrice: number;
  phone: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
  _id: string;
}
