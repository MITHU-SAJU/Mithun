import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProfile = () => api.get('/api/profile').then(res => res.data);
export const fetchSkills = () => api.get('/api/skills').then(res => res.data);
export const fetchProjects = () => api.get('/api/projects').then(res => res.data);
export const fetchExperience = () => api.get('/api/experience').then(res => res.data);
export const submitContact = (data) => api.post('/api/contact', data).then(res => res.data);

export default api;
