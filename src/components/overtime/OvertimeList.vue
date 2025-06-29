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
        <el-form-item label="审批状态">
          <el-select v-model="searchForm.isApprove" placeholder="请选择审批状态">
            <el-option
              v-for="item in approveOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否通过">
          <el-select v-model="searchForm.isPass" placeholder="请选择是否通过">
            <el-option
              v-for="item in passOptions"
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
      <el-table-column prop="createTime" label="日期" width="120" />
      <el-table-column label="申请的加班时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.overtimeDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="原因" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.isApprove, row.isPass)">
            {{ getStatusLabel(row.isApprove, row.isPass) }}
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
        v-model:current-page="pagination.pageNum"
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
import {ElMessage} from "element-plus";

const overtimeStore = useOvertimeStore()

const searchForm = reactive({
  dateRange: [],
  isApprove: null,
  isPass: null
})

const approveOptions = [
  { value: null, label: '全部' },
  { value: 0, label: '未审批' },
  { value: 1, label: '已审批' },
]

const passOptions = [
  { value: null, label: '全部' },
  { value: 0, label: '未通过' },
  { value: 1, label: '已通过' },
]

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const overtimeRecords = ref([])

const fetchData = async () => {
  const params = {
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    startDate: searchForm.dateRange[0] ? formatDate(searchForm.dateRange[0]) : null,
    endDate: searchForm.dateRange[1] ? formatDate(searchForm.dateRange[1]) : null,
    isApprove: searchForm.isApprove,
    isPass: searchForm.isPass
  }

  const res = await overtimeStore.getOvertimeCurrent(params)
  overtimeRecords.value = res.records || []
  pagination.total = res.total
}

const handleSearch = () => {
  pagination.pageNum = 1
  fetchData()
}

const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.status = ''
  handleSearch()
}

const getStatusLabel = (isApprove, isPass) => {
  if (isApprove === 0) {
    return '待审批'
  } else if (isApprove === 1 && isPass === 0) {
    return '已拒绝'
  } else if (isApprove === 1 && isPass === 1) {
    return '已批准'
  }
  return '未知状态'
}

const getStatusTagType = (isApprove, isPass) => {
  if (isApprove === 0) {
    return 'warning'
  } else if (isApprove === 1 && isPass === 0) {
    return 'danger'
  } else if (isApprove === 1 && isPass === 1) {
    return 'success'
  }
  return ''
}

const handleCancel = async (row) => {
  try {
    await overtimeStore.deleteOvertime(row.id)
    ElMessage.success('取消成功')
    await fetchData()
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
