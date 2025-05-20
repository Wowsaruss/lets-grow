import axios, { InternalAxiosRequestConfig } from 'axios'
import { getStoredToken } from './auth'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add a request interceptor to include the auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getStoredToken()
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api 