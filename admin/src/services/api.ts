import {
  Product,
  Service,
  Treatment,
  Order,
  Appointment,
  Review,
  ContactInquiry,
  NewsletterSubscriber,
  Coupon,
  User,
} from '../types';

const rawApiUrl = import.meta.env.VITE_API_URL || '/api';
const API_BASE = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('treatmed_admin_token');

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // If body is FormData (file upload), let browser set Content-Type header with boundary
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data as T;
}

// ─── AUTH APIs ──────────────────────────────────────────────────
export const loginAdmin = async (email: string, pass: string) => {
  const data = await request<User & { token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password: pass }),
  });
  if (data.token) {
    localStorage.setItem('treatmed_admin_token', data.token);
  }
  return data;
};

export const getAdminProfile = () => {
  return request<User>('/auth/me');
};

// ─── PRODUCTS APIs ──────────────────────────────────────────────
export const fetchProductsAdmin = (params?: { category?: string; search?: string }) => {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  const qs = query.toString();
  return request<Product[]>(`/products${qs ? `?${qs}` : ''}`);
};

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

// ─── SERVICES APIs ──────────────────────────────────────────────
export const fetchServicesAdmin = () => {
  return request<Service[]>('/services');
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

// ─── TREATMENTS APIs ────────────────────────────────────────────
export const fetchTreatmentsAdmin = () => {
  return request<Treatment[]>('/treatments');
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

// ─── ORDERS APIs ────────────────────────────────────────────────
export const fetchOrdersAdmin = () => {
  return request<Order[]>('/orders');
};

export const updateOrderStatusAdmin = (id: string, status: string) => {
  return request<Order>(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

// ─── APPOINTMENTS APIs ──────────────────────────────────────────
export const fetchAppointmentsAdmin = () => {
  return request<Appointment[]>('/appointments');
};

export const updateAppointmentStatusAdmin = (id: string, status: string) => {
  return request<Appointment>(`/appointments/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

// ─── REVIEWS APIs ───────────────────────────────────────────────
export const fetchReviewsAdmin = () => {
  return request<Review[]>('/reviews');
};

// ─── INQUIRIES & SUBSCRIBERS APIs ────────────────────────────────
export const fetchContactInquiriesAdmin = () => {
  return request<ContactInquiry[]>('/contact');
};

export const fetchNewsletterSubscribersAdmin = () => {
  return request<NewsletterSubscriber[]>('/newsletter');
};
