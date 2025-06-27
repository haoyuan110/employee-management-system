<template>
  <div class="business-list">
    <div class="toolbar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="出差地点">
          <el-input
            v-model="searchForm.destination"
            placeholder="请输入出差地点"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="businessRecords" border style="width: 100%">
      <el-table-column prop="destination" label="出差地点" width="180" />
      <el-table-column label="出差时间" width="220">
        <template #default="{ row }">
          <div>{{ formatDate(row.startDate) }}</div>
          <div>至</div>
          <div>{{ formatDate(row.endDate) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="days" label="天数" width="80" />
      <el-table-column prop="budget" label="预算(元)" width="120">
        <template #default="{ row }">
          ¥{{ row.budget.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="companions" label="同行人员" width="180">
        <template #default="{ row }">
          <el-tag
            v-for="companion in row.companions.slice(0, 2)"
            :key="companion.id"
            size="small"
            style="margin-right: 5px; margin-bottom: 5px"
          >
            {{ companion.name }}
          </el-tag>
          <el-tag
            v-if="row.companions.length > 2"
            size="small"
          >
            +{{ row.companions.length - 2 }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 'pending'"
            type="text"
            @click="handleCancel(row)"
          >
            取消
          </el-button>
          <el-button type="text" @click="handleView(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="fetchData"
        @current-change="fetchData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useBusinessStore } from '@/stores/business'
import { formatDate } from '@/utils/date'

const businessStore = useBusinessStore()

const searchForm = reactive({
  destination: '',
  status: '',
  dateRange: []
})

const statusOptions = [
  { value: 'pending', label: '待审批' },
  { value: 'approved', label: '已批准' },
  { value: 'rejected', label: '已拒绝' },
  { value: 'canceled', label: '已取消' }
]

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const businessRecords = ref([])

const fetchData = async () => {
  const params = {
    page: pagination.currentPage,
    size: pagination.pageSize,
    destination: searchForm.destination,
    status: searchForm.status,
    startDate: searchForm.dateRange[0] ? formatDate(searchForm.dateRange[0]) : '',
    endDate: searchForm.dateRange[1] ? formatDate(searchForm.dateRange[1]) : ''
  }

  const res = await businessStore.getBusinessRecords(params)
  businessRecords.value = res.data
  pagination.total = res.total
}

const handleSearch = () => {
  pagination.currentPage = 1
  fetchData()
}

const resetSearch = () => {
  searchForm.destination = ''
  searchForm.status = ''
  searchForm.dateRange = []
  handleSearch()
}

const getStatusLabel = (status) => {
  return statusOptions.find(item => item.value === status)?.label || status
}

const getStatusTagType = (status) => {
  const map = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    canceled: 'info'
  }
  return map[status] || ''
}

const handleCancel = async (row) => {
  try {
    await businessStore.cancelBusiness(row.id)
    ElMessage.success('取消成功')
    fetchData()
  } catch (error) {
    ElMessage.error('取消失败')
  }
}

const handleView = (row) => {
  // 查看详情逻辑
  console.log('View:', row)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.business-list {
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
