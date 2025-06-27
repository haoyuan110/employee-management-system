import { ref, watch } from 'vue'

export function usePagination(fetchFn, initialParams = {}) {
  const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })

  const loading = ref(false)
  const data = ref([])
  const params = ref(initialParams)

  const fetchData = async () => {
    try {
      loading.value = true
      const res = await fetchFn({
        page: pagination.value.currentPage,
        size: pagination.value.pageSize,
        ...params.value
      })
      data.value = res.data
      pagination.value.total = res.total
    } finally {
      loading.value = false
    }
  }

  watch(
    () => pagination.value.currentPage,
    () => fetchData()
  )

  watch(
    () => pagination.value.pageSize,
    () => {
      if (pagination.value.currentPage === 1) {
        fetchData()
      } else {
        pagination.value.currentPage = 1
      }
    }
  )

  return {
    pagination,
    loading,
    data,
    params,
    fetchData
  }
}
