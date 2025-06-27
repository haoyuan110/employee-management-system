import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

export const useUserStore = defineStore('auth', () => {
  const router = useRouter()
  const api = useApi()

  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const permissions = ref(JSON.parse(localStorage.getItem('permissions') || '[]'))
  const roles = ref(JSON.parse(localStorage.getItem('roles') || '[]'))

  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const userRoles = computed(() => roles.value)
  const userPermissions = computed(() => permissions.value)

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    token.value = response.token
    user.value = response.user
    roles.value = response.roles || []
    permissions.value = response.permissions || []

    // 保存到本地存储
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('roles', JSON.stringify(roles.value))
    localStorage.setItem('permissions', JSON.stringify(permissions.value))

    return response
  }

  const logout = () => {
    token.value = null
    user.value = null
    roles.value = []
    permissions.value = []

    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('roles')
    localStorage.removeItem('permissions')

    router.push('/login')
  }

  const hasRole = (role) => {
    return roles.value.includes(role)
  }

  const hasAnyRole = (requiredRoles) => {
    return requiredRoles.some(role => roles.value.includes(role))
  }

  const hasPermission = (permission) => {
    return permissions.value.includes(permission)
  }

  return {
    token,
    user,
    roles,
    permissions,
    isAuthenticated,
    currentUser,
    userRoles,
    userPermissions,
    login,
    logout,
    hasRole,
    hasAnyRole,
    hasPermission
  }
})
