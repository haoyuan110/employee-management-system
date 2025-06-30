import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useApi} from '@/composables/useApi'

export const useOvertimeStore = defineStore('overtime', () => {
    const api = useApi()
    const records = ref([])
    const total = ref(0)
    const pendingApprovals = ref([])

    const applyOvertime = async (data) => {
        const res = await api.post('/api/overtime/add', data)
        records.value.unshift(res.data)
        total.value += 1
        return res.data
    }

    const getRecords = async (params = {}) => {
        const res = await api.get('/api/overtime/search', {params})
        records.value = res.data.records || []
        total.value = res.data.total
        return res
    }

    const getOvertimeById = async (overtimeId) => {
        const res = await api.get(`/api/overtime/${overtimeId}`)
        return res.data
    }

    const getOvertimeCurrent = async (params) => {
        const res = await api.get('/api/overtime/current', {params})
        return res.data
    }

    // const getPendingApprovals = async () => {
    //     const res = await api.get('/api/overtime/approvals')
    //     pendingApprovals.value = res.data
    //     return res.data
    // }

    const approveOvertime = async (data) => {
        const res = await api.put('/api/overtime/approve', data)
        // 更新本地记录
        const index = records.value.findIndex(r => r.overtimeId === data.id)
        if (index !== -1) {
            records.value[index].isApprove = 1
            records.value[index].isPass = data.isPass
        }
        return res.data
    }

    const deleteOvertime = async (id) => {
        await api.post(`/api/overtime/delete/${id}`)
        const index = records.value.findIndex(r => r.id === id)
        if (index !== -1) {
            records.value.splice(index, 1)
            total.value -= 1
        }
    }

    return {
        records,
        total,
        pendingApprovals,
        applyOvertime,
        getRecords,
        getOvertimeById,
        getOvertimeCurrent,
        // getPendingApprovals,
        approveOvertime,
        deleteOvertime
    }
})
