// src/services/http.service.ts
import axios from 'axios';
import { BE_BASE_URL } from '@/environments/enviroments';
import router from '@/router';

const instance = axios.create({
  baseURL: BE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 1. Request interceptor — automatically attach the Bearer token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response interceptor — handle 401s centrally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const message = (error.response.data?.message || '').toLowerCase();
      if (message.includes('token') || message.includes('expired')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push({ name: 'login' });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
