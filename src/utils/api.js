import axios from 'axios'
import {useUserStore} from '@/stores/auth'

// 创建axios实例
const apiClient = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useUserStore()
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
            const {status} = error.response

            if (status === 40100) {
                // 未授权，跳转到登录页
                const authStore = useUserStore()
                authStore.logout()
                window.location.href = '/employee/login'
            } else if (status === 40101) {
                // 权限不足
                console.error('权限不足:', error.response.data.message)
            } else if (status === 40400) {
                // 资源不存在
                console.error('请求的资源不存在')
            } else if (status === 40000) {
                // 请求参数错误
                console.error('请求参数错误')
            } else if (status === 40001) {
                // 请求数据为空
                console.error('请求数据为空')
            } else if (status === 50000) {
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
    return apiClient.get(url, {params, ...config})
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
