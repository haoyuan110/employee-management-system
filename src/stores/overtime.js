import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useOvertimeStore = defineStore('overtime', () => {
  const api = useApi()
  const records = ref([])
  const total = ref(0)
  const pendingApprovals = ref([])

  const applyOvertime = async (data) => {
    const res = await api.post('/overtime', data)
    records.value.unshift(res.data)
    total.value += 1
    return res.data
  }

  const getRecords = async (params = {}) => {
    const res = await api.get('/overtime', { params })
    records.value = res.data
    total.value = res.total
    return res
  }

  const getPendingApprovals = async () => {
    const res = await api.get('/overtime/approvals')
    pendingApprovals.value = res.data
    return res.data
  }

  const approveOvertime = async (data) => {
    const res = await api.put(`/overtime/${data.id}/approve`, data)
    return res.data
  }

  const cancelOvertime = async (id) => {
    await api.put(`/overtime/${id}/cancel`)
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value[index].status = 'canceled'
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
