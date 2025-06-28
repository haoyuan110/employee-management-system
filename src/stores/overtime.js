import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useApi} from '@/composables/useApi'

export const useOvertimeStore = defineStore('overtime', () => {
    const api = useApi()
    const records = ref([])
    const total = ref(0)
    const pendingApprovals = ref([])

    const applyOvertime = async (data) => {
        // 修改为 /overtime/add 接口
        const res = await api.post('/overtime/add', data)
        records.value.unshift(res.data)
        total.value += 1
        return res.data
    }

    const getRecords = async (params = {}) => {
        // 设置默认分页参数，如 pageNum=1, pageSize=10
        const defaultParams = {
            pageNum: 1,
            pageSize: 10,
            ...params
        };

        const res = await api.get('/overtime/search', {params: defaultParams})
        records.value = res.data.records || []
        total.value = res.data.total
        return res.data
    }

    const getOvertimeById = async (overtimeId) => {
        const res = await api.get(`/overtime/details/${overtimeId}`)
        return res.data
    }

    const getPendingApprovals = async () => {
        const res = await api.get('/overtime/approvals')
        pendingApprovals.value = res.data
        return res.data
    }

    const approveOvertime = async (data) => {
        // 修改为 /overtime/approve 接口，并按后端要求的格式提交数据
        const res = await api.put('/overtime/approve', data)
        return res.data
    }

    const cancelOvertime = async (id) => {
        await api.post(`/overtime/delete/${id}`)
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
        getPendingApprovals,
        approveOvertime,
        cancelOvertime
    }
})
