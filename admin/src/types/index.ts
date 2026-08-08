export interface Product {
  id: string;
  _id?: string;
  name: string;
  category: 'Hair Care' | 'Pain Relief' | 'Tablets';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  imagePublicId?: string;
  shortDesc: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  usage: string;
  size: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  createdAt?: string;
}

export interface Service {
  id: string;
  _id?: string;
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
  imagePublicId?: string;
  createdAt?: string;
}

export interface Treatment {
  id: string;
  _id?: string;
  title: string;
  category: string;
  summary: string;
  symptomsAddressed: string[];
  unaniApproach: string;
  recommendedDuration: string;
  iconName: string;
  image: string;
  imagePublicId?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role?: string;
  createdAt?: string;
  address?: {
    street: string;
    city: string;
    pincode: string;
    state: string;
  };
}

export interface OrderItem {
  productId?: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  street: string;
  pincode: string;
}

export interface Order {
  id: string;
  _id?: string;
  userId?: string | User;
  items: OrderItem[];
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: 'cod' | 'upi' | 'pickup';
  couponCode?: string;
  discountAmount?: number;
  deliveryFee?: number;
  createdAt?: string;
}

export interface Appointment {
  id: string;
  _id?: string;
  userId?: string | User;
  serviceTitle: string;
  date: string;
  time: string;
  patientName: string;
  phone: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt?: string;
}

export interface Review {
  id: string;
  _id?: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  treatmentOrProduct?: string;
  createdAt?: string;
}

export interface ContactInquiry {
  _id?: string;
  id?: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export interface NewsletterSubscriber {
  _id?: string;
  id?: string;
  email: string;
  phone?: string;
  createdAt?: string;
}

export interface Coupon {
  _id?: string;
  id?: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
  expiresAt?: string;
  minOrderAmount?: number;
}

export type AdminTab = 
  | 'dashboard'
  | 'products'
  | 'services'
  | 'treatments'
  | 'orders'
  | 'appointments'
  | 'reviews'
  | 'inquiries'
  | 'subscribers'
  | 'coupons';
