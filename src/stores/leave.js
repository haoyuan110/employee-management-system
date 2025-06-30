import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useApi} from '@/composables/useApi'

export const useLeaveStore = defineStore('leave', () => {
    const api = useApi()
    const records = ref([])
    const total = ref(0)
    const leaveTypes = ref([])

    const applyLeave = async (data) => {
        const res = await api.post('/api/holiday/add', data)
        records.value.unshift(res.data)
        total.value += 1
        return res.data
    }

    const getRecords = async (params = {}) => {
        const res = await api.get('/api/holiday/search', {params})
        records.value = res.data.records || []
        total.value = res.data.total
        return res
    }

    const getHolidayById = async (holidayId) => {
        const res = await api.get(`/api/holiday/${holidayId}`)
        return res.data
    }

    const getHolidayCurrent = async (params) => {
        const res = await api.get('/api/holiday/current', {params})
        return res.data
    }

    const approveHoliday = async (data) => {
        const res = await api.put('/api/holiday/approve', data)
        // 更新本地记录
        const index = records.value.findIndex(r => r.holidayId === data.id)
        if (index !== -1) {
            records.value[index].isApprove = 1
            records.value[index].isPass = data.isPass
        }
        return res.data
    }

    const deleteHoliday = async (id) => {
        await api.post(`/api/holiday/delete/${id}`)
        const index = records.value.findIndex(r => r.id === id)
        if (index !== -1) {
            records.value.splice(index, 1)
            total.value -= 1
        }
    }

    return {
        records,
        total,
        leaveTypes,
        applyLeave,
        getRecords,
        getHolidayById,
        getHolidayCurrent,
        approveHoliday,
        deleteHoliday,
    }
})
