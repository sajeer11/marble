
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  // Added '-15%' to the allowed values for the tag property
  tag?: 'New' | 'Best Seller' | 'Low Stock' | '-15%' | '-30%' | '-50%';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface RangeCategory {
  title: string;
  image: string;
}

// src/types/index.ts

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
 // tag?: string;
}

export interface CartItem extends Product {
  quantity: number;
}



export type OrderStatus = 'In Transit' | 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';

export interface ProductThumbnail {
  id: string;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  amount: number;
  status: OrderStatus;
  products: ProductThumbnail[];
  summary: string;
}

export interface User {
  name: string;
  email: string;
  membershipDate: string;
  membershipType: string;
  avatar: string;
}

export interface ShipmentStep {
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}
