import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// 创建axios实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        // 未授权，跳转到登录页
        const authStore = useAuthStore()
        authStore.logout()
        window.location.href = '/login'
      } else if (status === 403) {
        // 权限不足
        console.error('权限不足:', error.response.data.message)
      } else if (status === 404) {
        // 资源不存在
        console.error('请求的资源不存在')
      } else if (status >= 500) {
        // 服务器错误
        console.error('服务器错误:', error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)

/**
 * GET请求
 * @param {string} url
 * @param {object} params
 * @param {object} config
 * @returns {Promise}
 */
export function get(url, params = {}, config = {}) {
  return apiClient.get(url, { params, ...config })
}

/**
 * POST请求
 * @param {string} url
 * @param {object} data
 * @param {object} config
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
  return apiClient.post(url, data, config)
}

/**
 * PUT请求
 * @param {string} url
 * @param {object} data
 * @param {object} config
 * @returns {Promise}
 */
export function put(url, data = {}, config = {}) {
  return apiClient.put(url, data, config)
}

/**
 * DELETE请求
 * @param {string} url
 * @param {object} config
 * @returns {Promise}
 */
export function del(url, config = {}) {
  return apiClient.delete(url, config)
}

/**
 * 上传文件
 * @param {string} url
 * @param {FormData} formData
 * @param {object} config
 * @returns {Promise}
 */
export function upload(url, formData, config = {}) {
  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

export default apiClient
