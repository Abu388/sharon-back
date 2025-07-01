import axios, { AxiosInstance } from 'axios';

const ApiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://127.0.0.1:5001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default ApiClient;