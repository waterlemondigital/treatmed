import { Product, Service, Treatment, Review, Order, Appointment, User } from '../types';

const API_BASE = '/api';

// Helper for HTTP requests
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('treatmed_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred during API request.');
  }

  return data as T;
}

// ─── Products API ──────────────────────────────────────────────
export const fetchProducts = (params?: { category?: string; search?: string; bestSeller?: boolean }) => {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.bestSeller) query.append('bestSeller', 'true');

  const queryString = query.toString();
  return request<Product[]>(`/products${queryString ? `?${queryString}` : ''}`);
};

export const fetchProductById = (id: string) => {
  return request<Product>(`/products/${id}`);
};

// ─── Services API ──────────────────────────────────────────────
export const fetchServices = (category?: string) => {
  return request<Service[]>(`/services${category ? `?category=${encodeURIComponent(category)}` : ''}`);
};

export const fetchServiceById = (id: string) => {
  return request<Service>(`/services/${id}`);
};

// ─── Treatments API ────────────────────────────────────────────
export const fetchTreatments = () => {
  return request<Treatment[]>('/treatments');
};

export const fetchTreatmentById = (id: string) => {
  return request<Treatment>(`/treatments/${id}`);
};

// ─── Reviews API ───────────────────────────────────────────────
export const fetchReviews = (product?: string) => {
  return request<Review[]>(`/reviews${product ? `?product=${encodeURIComponent(product)}` : ''}`);
};

export const createReview = (review: { rating: number; title: string; comment: string; treatmentOrProduct?: string }) => {
  return request<Review>('/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  });
};

// ─── Auth API ──────────────────────────────────────────────────
export const loginUser = async (email: string, pass: string) => {
  const data = await request<User & { token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password: pass }),
  });
  if (data.token) {
    localStorage.setItem('treatmed_token', data.token);
  }
  return data;
};

export const registerUser = async (name: string, email: string, phone: string, pass: string) => {
  const data = await request<User & { token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, password: pass }),
  });
  if (data.token) {
    localStorage.setItem('treatmed_token', data.token);
  }
  return data;
};

export const getCurrentUser = () => {
  return request<User>('/auth/me');
};

// ─── Orders API ────────────────────────────────────────────────
export const createOrder = (orderData: {
  items: { productId?: string; productName: string; quantity: number; price: number }[];
  shippingAddress: { name: string; phone: string; street: string; pincode: string };
  paymentMethod: string;
  couponCode?: string;
  discountAmount?: number;
  deliveryFee?: number;
}) => {
  return request<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

export const fetchMyOrders = () => {
  return request<Order[]>('/orders/my');
};

// ─── Appointments API ──────────────────────────────────────────
export const createAppointment = (appointmentData: {
  serviceTitle: string;
  date: string;
  time: string;
  patientName: string;
  phone: string;
  notes?: string;
}) => {
  return request<Appointment>('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
};

export const fetchMyAppointments = () => {
  return request<Appointment[]>('/appointments/my');
};

// ─── Contact API ───────────────────────────────────────────────
export const submitContactInquiry = (inquiry: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}) => {
  return request<{ message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  });
};

// ─── Newsletter API ────────────────────────────────────────────
export const subscribeNewsletter = (data: { email: string; phone?: string }) => {
  return request<{ message: string }>('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// ─── Coupon API ────────────────────────────────────────────────
export const validateCoupon = (code: string, subtotal?: number) => {
  return request<{
    valid: boolean;
    code: string;
    discountPercent: number;
    discountAmount: number | null;
    message: string;
  }>('/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({ code, subtotal }),
  });
};

// ─── Admin Management APIs ──────────────────────────────────────
export const createProductAdmin = (productData: Partial<Product>) => {
  return request<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

export const updateProductAdmin = (id: string, productData: Partial<Product>) => {
  return request<Product>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

export const deleteProductAdmin = (id: string) => {
  return request<{ message: string }>(`/products/${id}`, {
    method: 'DELETE',
  });
};

export const createServiceAdmin = (serviceData: Partial<Service>) => {
  return request<Service>('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  });
};

export const updateServiceAdmin = (id: string, serviceData: Partial<Service>) => {
  return request<Service>(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  });
};

export const deleteServiceAdmin = (id: string) => {
  return request<{ message: string }>(`/services/${id}`, {
    method: 'DELETE',
  });
};

export const createTreatmentAdmin = (treatmentData: Partial<Treatment>) => {
  return request<Treatment>('/treatments', {
    method: 'POST',
    body: JSON.stringify(treatmentData),
  });
};

export const updateTreatmentAdmin = (id: string, treatmentData: Partial<Treatment>) => {
  return request<Treatment>(`/treatments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(treatmentData),
  });
};

export const deleteTreatmentAdmin = (id: string) => {
  return request<{ message: string }>(`/treatments/${id}`, {
    method: 'DELETE',
  });
};

export const fetchAllOrdersAdmin = () => {
  return request<Order[]>('/orders');
};

export const updateOrderStatusAdmin = (id: string, status: string) => {
  return request<Order>(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

export const fetchAllAppointmentsAdmin = () => {
  return request<Appointment[]>('/appointments');
};

export const updateAppointmentStatusAdmin = (id: string, status: string) => {
  return request<Appointment>(`/appointments/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

export const fetchContactInquiriesAdmin = () => {
  return request<any[]>('/contact');
};

export const fetchNewsletterSubscribersAdmin = () => {
  return request<any[]>('/newsletter');
};
