import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchFeatured = () => api.get('/media/featured').then((res) => res.data);
export const fetchMediaByType = (type) => api.get('/media', { params: { type } }).then((res) => res.data);