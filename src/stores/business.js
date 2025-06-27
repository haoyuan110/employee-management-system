import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useBusinessStore = defineStore('business', () => {
  const api = useApi()
  const records = ref([])
  const total = ref(0)

  const applyBusiness = async (data) => {
    const res = await api.post('/business', data)
    records.value.unshift(res.data)
    total.value += 1
    return res.data
  }

  const getRecords = async (params = {}) => {
    const res = await api.get('/business', { params })
    records.value = res.data
    total.value = res.total
    return res
  }

  const cancelBusiness = async (id) => {
    await api.put(`/business/${id}/cancel`)
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value[index].status = 'canceled'
    }
  }

  return {
    records,
    total,
    applyBusiness,
    getRecords,
    cancelBusiness
  }
})
