<template>
  <el-card class="attendance-card">
    <template #header>
      <div class="card-header">
        <span>考勤记录</span>
        <el-button type="primary" size="small" @click="checkIn">
          {{ isCheckedIn ? '已签到' : '签到' }}
        </el-button>
      </div>
    </template>
    <el-table :data="attendanceRecords" style="width: 100%">
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="checkIn" label="签到时间" width="120" />
      <el-table-column prop="checkOut" label="签退时间" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="fetchAttendanceRecords"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAttendanceStore } from '@/stores/attendance'

const attendanceStore = useAttendanceStore()

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const attendanceRecords = computed(() => attendanceStore.records)
const isCheckedIn = computed(() => attendanceStore.isCheckedIn)

const fetchAttendanceRecords = async () => {
  await attendanceStore.fetchRecords({
    page: currentPage.value,
    size: pageSize.value
  })
  total.value = attendanceStore.total
}

const checkIn = async () => {
  if (!isCheckedIn.value) {
    await attendanceStore.checkIn()
    fetchAttendanceRecords()
  }
}

const getStatusTagType = (status) => {
  const map = {
    '正常': 'success',
    '迟到': 'warning',
    '早退': 'warning',
    '缺勤': 'danger'
  }
  return map[status] || 'info'
}

// Initial fetch
fetchAttendanceRecords()
</script>

<style scoped>
.attendance-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
