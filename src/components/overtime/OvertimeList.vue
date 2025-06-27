<template>
  <div class="overtime-list">
    <div class="toolbar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="overtimeRecords" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column label="时间段" width="180">
        <template #default="{ row }">
          {{ formatTime(row.startTime) }} - {{ formatTime(row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="时长(小时)" width="120" />
      <el-table-column prop="type" label="类型" width="120">
        <template #default="{ row }">
          {{ getTypeLabel(row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="原因" />
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
import { useOvertimeStore } from '@/stores/overtime'
import { formatDate, formatTime } from '@/utils/date'

const overtimeStore = useOvertimeStore()

const searchForm = reactive({
  dateRange: [],
  status: ''
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

const overtimeRecords = ref([])

const fetchData = async () => {
  const params = {
    page: pagination.currentPage,
    size: pagination.pageSize,
    startDate: searchForm.dateRange[0] ? formatDate(searchForm.dateRange[0]) : '',
    endDate: searchForm.dateRange[1] ? formatDate(searchForm.dateRange[1]) : '',
    status: searchForm.status
  }

  const res = await overtimeStore.getOvertimeRecords(params)
  overtimeRecords.value = res.data
  pagination.total = res.total
}

const handleSearch = () => {
  pagination.currentPage = 1
  fetchData()
}

const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.status = ''
  handleSearch()
}

const getTypeLabel = (type) => {
  const map = {
    weekday: '平日加班',
    weekend: '周末加班',
    holiday: '节假日加班',
    emergency: '紧急加班'
  }
  return map[type] || type
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
    await overtimeStore.cancelOvertime(row.id)
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
.overtime-list {
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
