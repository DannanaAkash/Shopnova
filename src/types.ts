export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  features: string[];
  specs: Record<string, string>;
  stock: number;
  discount: number;
  colors: string[];
  smartScore?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  deliveryDate?: string;
  total: number;
  items: CartItem[];
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface User {
  email: string;
  name: string;
  orders: Order[];
}
