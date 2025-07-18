import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/profile');
export const getItems = () => api.get('/items');
export const reportLostItem = (data) => api.post('/items/lost', data);
export const reportFoundItem = (data) => api.post('/items/found', data);
export const getMyReports = () => api.get('/items/my-reports');
export const claimItem = (id) => api.post(`/items/claim`, { id });
export const getInventory = () => api.get('/items/inventory');
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const offerReward = (data) => api.post('/rewards', data);
export const getMyRewards = () => api.get('/rewards/my-rewards');
export const payReward = (data) => api.post('/rewards/pay', data);
export const getRewardHistory = () => api.get('/rewards/history');
export const getApprovals = () => api.get('/admin/approvals');
export const approveItem = (id) => api.post(`/admin/approve/${id}`);
export const getReturnedItems = () => api.get('/admin/returned');

export default api;