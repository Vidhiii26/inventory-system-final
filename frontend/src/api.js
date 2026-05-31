import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inventory-management-system-dd3t.onrender.com', 
});

export default api;