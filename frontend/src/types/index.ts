export interface Product {
  id: string;
  name: string;
  category: 'Hair Care' | 'Pain Relief' | 'Tablets';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  shortDesc: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  usage: string;
  size: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface Service {
  id: string;
  title: string;
  category: 'Consultation' | 'Therapy' | 'Wellness' | 'Diagnostics';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  duration: string;
  priceEstimate: string;
  whatToExpect: string[];
  benefits: string[];
  image: string;
}

export interface Treatment {
  id: string;
  title: string;
  category: string;
  summary: string;
  symptomsAddressed: string[];
  unaniApproach: string;
  recommendedDuration: string;
  iconName: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role?: string;
  createdAt: string;
  address?: {
    street: string;
    city: string;
    pincode: string;
    state: string;
  };
}

export interface Order {
  id: string;
  date: string;
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export interface Appointment {
  id: string;
  serviceTitle: string;
  date: string;
  time: string;
  patientName: string;
  phone: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  treatmentOrProduct?: string;
}

export type PageView = 
  | { type: 'home' }
  | { type: 'shop'; category?: string; search?: string }
  | { type: 'product-detail'; productId: string }
  | { type: 'services' }
  | { type: 'service-detail'; serviceId: string }
  | { type: 'treatments' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'cart' }
  | { type: 'login' }
  | { type: 'signup' }
  | { type: 'account' };
