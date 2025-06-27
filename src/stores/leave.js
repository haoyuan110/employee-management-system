import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useLeaveStore = defineStore('leave', () => {
  const api = useApi()
  const records = ref([])
  const total = ref(0)
  const leaveTypes = ref([
    { id: 1, name: '年假', code: 'annual' },
    { id: 2, name: '病假', code: 'sick' },
    { id: 3, name: '事假', code: 'personal' },
    { id: 4, name: '婚假', code: 'marriage' },
    { id: 5, name: '产假', code: 'maternity' },
    { id: 6, name: '陪产假', code: 'paternity' },
    { id: 7, name: '丧假', code: 'funeral' }
  ])

  const applyLeave = async (data) => {
    const res = await api.post('/leave', data)
    records.value.unshift(res.data)
    total.value += 1
    return res.data
  }

  const getRecords = async (params = {}) => {
    const res = await api.get('/leave', { params })
    records.value = res.data
    total.value = res.total
    return res
  }

  const cancelLeave = async (id) => {
    await api.put(`/leave/${id}/cancel`)
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value[index].status = 'canceled'
    }
  }

  return {
    records,
    total,
    leaveTypes,
    applyLeave,
    getRecords,
    cancelLeave
  }
})
