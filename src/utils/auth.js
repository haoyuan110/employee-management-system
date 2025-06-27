import jwtDecode from 'jwt-decode'

/**
 * 检查token是否有效
 * @param {string} token
 * @returns {boolean}
 */
export function isTokenValid(token) {
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

/**
 * 从token中获取用户信息
 * @param {string} token
 * @returns {object|null}
 */
export function getUserFromToken(token) {
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return {
      id: decoded.sub,
      name: decoded.name,
      roles: decoded.roles || [],
      permissions: decoded.permissions || []
    }
  } catch (error) {
    console.error('Token解析失败:', error)
    return null
  }
}

/**
 * 检查用户是否有指定角色
 * @param {array} userRoles
 * @param {string|array} requiredRoles
 * @returns {boolean}
 */
export function hasRole(userRoles, requiredRoles) {
  if (!userRoles || !userRoles.length) return false

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.some(role => userRoles.includes(role))
  }
  return userRoles.includes(requiredRoles)
}

/**
 * 检查用户是否有指定权限
 * @param {array} userPermissions
 * @param {string|array} requiredPermissions
 * @returns {boolean}
 */
export function hasPermission(userPermissions, requiredPermissions) {
  if (!userPermissions || !userPermissions.length) return false

  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.some(perm => userPermissions.includes(perm))
  }
  return userPermissions.includes(requiredPermissions)
}

/**
 * 格式化文件大小
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 防抖函数
 * @param {function} func
 * @param {number} delay
 * @returns {function}
 */
export function debounce(func, delay = 300) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {function} func
 * @param {number} threshold
 * @returns {function}
 */
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
