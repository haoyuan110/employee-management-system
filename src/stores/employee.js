import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useEmployeeStore = defineStore('employee', () => {
  const api = useApi()
  const employees = ref([])
  const total = ref(0)
  const departments = ref([
    { id: 1, name: '开发部' },
    { id: 2, name: '设计部' },
    { id: 3, name: '产品部' },
    { id: 4, name: '市场部' },
    { id: 5, name: '人力资源部' }
  ])

  const getEmployees = async (params = {}) => {
    const res = await api.get('/employees', { params })
    employees.value = res.data
    total.value = res.total
    return res
  }

  const getEmployeeById = async (id) => {
    const res = await api.get(`/employees/${id}`)
    return res.data
  }

  const addEmployee = async (employee) => {
    const res = await api.post('/employees', employee)
    employees.value.unshift(res.data)
    total.value += 1
    return res.data
  }

  const updateEmployee = async (employee) => {
    const res = await api.put(`/employees/${employee.id}`, employee)
    const index = employees.value.findIndex(e => e.id === employee.id)
    if (index !== -1) {
      employees.value[index] = res.data
    }
    return res.data
  }

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`)
    employees.value = employees.value.filter(e => e.id !== id)
    total.value -= 1
  }

  return {
    employees,
    total,
    departments,
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
  }
})
