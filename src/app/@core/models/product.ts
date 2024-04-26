import { Category } from './category';

export interface Product {
  _id: string;
  name: string;
  description: string;
  productImage: string;
  price: number;
  quantity: number;
  category: Category;
}

export interface ProductRequest {
  name: string;
  description: string;
  productImage: string;
  price: number;
  quantity: number;
  categoryId: string;
}
export interface ProductRequestUpdate {
  _id: string;
  name: string;
  description: string;
  productImage: string;
  price: number;
  quantity: number;
  categoryId: string;
}

export interface ProductResponse {
  message: string;
  product: Product;
}
