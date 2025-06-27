import axios from 'axios'
import { useUserStore } from '@/stores/auth'

export function useApi() {
  const authStore = useUserStore()

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000
  })

  // 请求拦截器
  api.interceptors.request.use(config => {
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  // 响应拦截器
  api.interceptors.response.use(response => {
    return response.data
  }, error => {
    if (error.response?.status === 401) {
      authStore.logout()
      window.location.reload()
    }
    return Promise.reject(error)
  })

  return api
}
