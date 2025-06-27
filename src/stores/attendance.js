import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useAttendanceStore = defineStore('attendance', () => {
  const api = useApi()
  const records = ref([])
  const total = ref(0)
  const isCheckedIn = ref(false)

  const checkIn = async () => {
    const res = await api.post('/attendance/check-in')
    isCheckedIn.value = true
    return res
  }

  const checkOut = async () => {
    const res = await api.post('/attendance/check-out')
    isCheckedIn.value = false
    return res
  }

  const getRecords = async (params = {}) => {
    const res = await api.get('/attendance/records', { params })
    records.value = res.data
    total.value = res.total
    return res
  }

  const getStats = async (params = {}) => {
    const res = await api.get('/attendance/stats', { params })
    return res.data
  }

  return {
    records,
    total,
    isCheckedIn,
    checkIn,
    checkOut,
    getRecords,
    getStats
  }
})
