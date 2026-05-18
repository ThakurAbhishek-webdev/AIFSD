// src/services/api.js — Centralized Axios instance and all API call functions

import axios from 'axios';

// Base URL for the backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://aifsd-backend-5xbc.onrender.com/api',
});

// Interceptor: Automatically attach JWT token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== AUTH APIs =====

// POST /api/auth/signup
export const signup = (data) => API.post('/auth/signup', data);

// POST /api/auth/login
export const login = (data) => API.post('/auth/login', data);

// ===== EMPLOYEE APIs =====

// GET /api/employees
export const getEmployees = () => API.get('/employees');

// POST /api/employees
export const addEmployee = (data) => API.post('/employees', data);

// GET /api/employees/search?department=...
export const searchEmployees = (department) =>
  API.get(`/employees/search?department=${department}`);

// PUT /api/employees/:id
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);

// DELETE /api/employees/:id
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// ===== AI APIs =====

// POST /api/ai/recommend
export const getAIRecommendation = (employees) =>
  API.post('/ai/recommend', { employees });

export default API;
