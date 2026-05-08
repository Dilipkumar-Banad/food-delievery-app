import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const authService = {
  login: (email, password) =>
    axios.post(`${API_URL}/auth/login`, { email, password }),
  
  register: (email, password, name, phone) =>
    axios.post(`${API_URL}/auth/register`, { email, password, name, phone }),
}

export const productService = {
  getAll: () => axios.get(`${API_URL}/products`),
  
  getById: (id) => axios.get(`${API_URL}/products/${id}`),
  
  create: (data, token) =>
    axios.post(`${API_URL}/products`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  update: (id, data, token) =>
    axios.put(`${API_URL}/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
}

export const orderService = {
  getAll: (token) =>
    axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getById: (id, token) =>
    axios.get(`${API_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  create: (data, token) =>
    axios.post(`${API_URL}/orders`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  confirmPayment: (orderId, paymentData, token) =>
    axios.post(`${API_URL}/orders/${orderId}/payment-confirm`, paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    }),
}

export const userService = {
  getProfile: (token) =>
    axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  updateProfile: (data, token) =>
    axios.put(`${API_URL}/users/profile`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  addFeedback: (data, token) =>
    axios.post(`${API_URL}/users/feedback`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
}

export const agentService = {
  getOrders: (token) =>
    axios.get(`${API_URL}/agents/my-orders`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  updateOrderStatus: (orderId, status, token) =>
    axios.put(`${API_URL}/agents/orders/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    }),
}
