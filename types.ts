
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