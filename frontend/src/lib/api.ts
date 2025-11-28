/// <reference types="vite/client" />
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  return config;
});

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
};

export const listProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const login = async (email: string, password: string) => {
  // Backend expects { username, password }
  const { data } = await api.post('/auth/login', { username: email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (email: string, password: string) => {
  // Use email as the unique identifier on backend (username)
  const { data } = await api.post('/auth/register', { username: email, password });
  return data;
};
