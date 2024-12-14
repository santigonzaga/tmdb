import axios from 'axios';
import { config } from '../utils/config';

const axiosInstance = axios.create({
  baseURL: config.tmdbBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

export default axiosInstance;