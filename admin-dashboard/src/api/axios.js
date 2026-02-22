import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL
});

// Attach token and handle 401 (logout)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (email, password) =>
  api.post("/api/auth/login", { email, password }).then((r) => r.data);

// Admin stats
export const getAdminStats = () =>
  api.get("/api/admin/stats").then((r) => r.data);

// Products
export const getProducts = () => api.get("/api/products").then((r) => r.data);
export const getProduct = (id) =>
  api.get(`/api/products/${id}`).then((r) => r.data);
export const createProduct = (data) =>
  api.post("/api/products", data).then((r) => r.data);
export const updateProduct = (id, data) =>
  api.put(`/api/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id) =>
  api.delete(`/api/products/${id}`).then((r) => r.data);
export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  // Use api instance so baseURL and auth token are sent; do not set Content-Type (axios adds multipart boundary)
  const res = await api.post("/api/upload", formData);
  return res.data;
};

// Orders
export const getOrders = () => api.get("/api/orders").then((r) => r.data);
export const updateOrderStatus = (id, status) =>
  api.put(`/api/orders/${id}/status`, { status }).then((r) => r.data);

// Users
export const getUsers = () => api.get("/api/users").then((r) => r.data);
export const getUser = (id) => api.get(`/api/users/${id}`).then((r) => r.data);
export const deleteUser = (id) =>
  api.delete(`/api/users/${id}`).then((r) => r.data);
