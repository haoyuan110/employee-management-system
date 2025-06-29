import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useApi} from '@/composables/useApi'

export const useEmployeeStore = defineStore('employee', () => {
    const api = useApi()
    const employees = ref([])     // 员工列表数据
    const total = ref(0)          // 员工总数
    const departments = ref([     // 部门静态数据（模拟）
        // {id: 1, name: '开发部'},
        // {id: 2, name: '设计部'},
        // {id: 3, name: '产品部'},
        // {id: 4, name: '市场部'},
        // {id: 5, name: '人力资源部'}
    ])

    const getEmployees = async (params = {}) => {
        const res = await api.get('/api/employee/search', { params })
        employees.value = res.data.records || []
        total.value = res.data.total
        return res
    }


    const getEmployeeById = async (employeeId) => {
        const res = await api.get(`/api/employee/${employeeId}`)
        return res.data
    }

    const addEmployee = async (employee) => {
        const res = await api.post('/api/employee/add', employee)
        employees.value.unshift(res.data)
        total.value += 1
        return res.data
    }

    const updateEmployee = async (employee) => {
        const res = await api.put('/api/employee/update', employee)
        const index = employees.value.findIndex(e => e.employeeId === employee.employeeId)
        if (index !== -1) {
            employees.value[index] = res.data
        }
        return res.data
    }

    const deleteEmployee = async (employeeId) => {
        await api.post(`/api/employee/delete/${employeeId}`)
        employees.value = employees.value.filter(e => e.employeeId !== employeeId)
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
