import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useNoticeStore = defineStore('notice', () => {
  const api = useApi()
  const notices = ref([])
  const total = ref(0)
  const currentNotice = ref(null)

  const getNotices = async (params = {}) => {
    const res = await api.get('/notices', { params })
    notices.value = res.data
    total.value = res.total
    return res
  }

  const getNoticeDetail = async (id) => {
    const res = await api.get(`/notices/${id}`)
    currentNotice.value = res.data
    return res.data
  }

  const createNotice = async (data) => {
    const res = await api.post('/notices', data)
    notices.value.unshift(res.data)
    total.value += 1
    return res.data
  }

  const revokeNotice = async (id) => {
    await api.put(`/notices/${id}/revoke`)
    const index = notices.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notices.value[index].status = 'revoked'
    }
    if (currentNotice.value && currentNotice.value.id === id) {
      currentNotice.value.status = 'revoked'
    }
  }

  return {
    notices,
    total,
    currentNotice,
    getNotices,
    getNoticeDetail,
    createNotice,
    revokeNotice
  }
})
