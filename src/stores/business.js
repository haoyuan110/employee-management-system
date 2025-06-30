import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useBusinessStore = defineStore('business', () => {
  const api = useApi()
  const records = ref([])
  const total = ref(0)

  const applyBusiness = async (data) => {
    const res = await api.post('/api/business/add', data)
    records.value.unshift(res.data)
    total.value += 1
    return res.data
  }

  const getRecords = async (params = {}) => {
    const res = await api.get('/api/business/search', { params })
    records.value = res.data.records || []
    total.value = res.data.total
    return res
  }

  const getBusinessById = async (overtimeId) => {
    const res = await api.get(`/api/business/${overtimeId}`)
    return res.data
  }

  const getBusinessCurrent = async (params) => {
    const res = await api.get('/api/business/current', {params})
    return res.data
  }

  const approveBusiness = async (data) => {
    const res = await api.put('/api/business/approve', data)
    // 更新本地记录
    const index = records.value.findIndex(r => r.overtimeId === data.id)
    if (index !== -1) {
      records.value[index].isApprove = 1
      records.value[index].isPass = data.isPass
    }
    return res.data
  }

  const deleteOvertime = async (id) => {
    await api.post(`/api/business/delete/${id}`)
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value.splice(index, 1)
      total.value -= 1
    }
  }

  return {
    records,
    total,
    applyBusiness,
    getRecords,
    getBusinessById,
    getBusinessCurrent,
    approveBusiness,
    deleteOvertime
  }
})
