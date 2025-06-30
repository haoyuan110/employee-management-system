import jwtDecode from 'jwt-decode'

const TokenKey = 'vue_admin_template_token'

// Token 存储管理
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

// Token 验证和解析
export function isTokenValid(token = getToken()) {
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch (error) {
    console.error('Token解析失败:', error)
    return false
  }
}

export function getUserFromToken(token = getToken()) {
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return {
      id: decoded.sub || decoded.userId,
      name: decoded.name || decoded.username,
      roles: decoded.roles || [],
      permissions: decoded.permissions || [],
      // 添加其他可能需要的字段
      ...decoded
    }
  } catch (error) {
    console.error('Token解析失败:', error)
    return null
  }
}

// 权限检查
export function hasRole(userRoles, requiredRoles) {
  if (!userRoles || !userRoles.length) return false

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.some(role => userRoles.includes(role))
  }
  return userRoles.includes(requiredRoles)
}

export function hasPermission(userPermissions, requiredPermissions) {
  if (!userPermissions || !userPermissions.length) return false

  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.some(perm => userPermissions.includes(perm))
  }
  return userPermissions.includes(requiredPermissions)
}

// 工具函数
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function debounce(func, delay = 300) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function throttle(func, threshold = 300) {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last > threshold) {
      func.apply(this, args)
      last = now
    }
  }
}

// 默认导出常用功能
export default {
  getToken,
  setToken,
  removeToken,
  isTokenValid,
  getUserFromToken,
  hasRole,
  hasPermission,
  formatFileSize,
  debounce,
  throttle
}