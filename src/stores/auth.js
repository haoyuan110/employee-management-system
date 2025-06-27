import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

export const useUserStore = defineStore('auth', () => {
  const router = useRouter()
  const api = useApi()

  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const roles = ref(JSON.parse(localStorage.getItem('roles') || '[]'))
  const permissions = ref(JSON.parse(localStorage.getItem('permissions') || '[]'))

  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  const userRoles = computed(() => roles.value)
  const userPermissions = computed(() => permissions.value)

  const login = async (credentials) => {
    const response = await api.post('/api/employee/login', credentials)
    const employee = response.data

    user.value = employee
    roles.value = [employee.employeeRole] // 角色字段为 employeeRole
    permissions.value = [] // 可以从后端扩展权限字段

    localStorage.setItem('user', JSON.stringify(employee))
    localStorage.setItem('roles', JSON.stringify([employee.employeeRole]))
    localStorage.setItem('permissions', JSON.stringify([]))

    return employee
  }

  const logout = () => {
    user.value = null
    roles.value = []
    permissions.value = []

    localStorage.removeItem('user')
    localStorage.removeItem('roles')
    localStorage.removeItem('permissions')

    api.post('/employee/logout').finally(() => {
      router.push('/employee/login')
    })
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
