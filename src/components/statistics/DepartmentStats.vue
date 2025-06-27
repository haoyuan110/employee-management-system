<template>
  <div class="department-stats">
    <el-table :data="departmentData" border style="width: 100%">
      <el-table-column prop="name" label="部门名称" width="180" />
      <el-table-column prop="total" label="总人数" width="100" />
      <el-table-column prop="attendanceRate" label="出勤率" width="120">
        <template #default="{ row }">
          <el-progress
            :percentage="row.attendanceRate"
            :color="getProgressColor(row.attendanceRate)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="normal" label="正常" width="100" />
      <el-table-column prop="late" label="迟到" width="100" />
      <el-table-column prop="early" label="早退" width="100" />
      <el-table-column prop="absent" label="缺勤" width="100" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" @click="viewDetail(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAttendanceStore } from '@/stores/attendance'

const attendanceStore = useAttendanceStore()
const departmentData = ref([])

const fetchData = async () => {
  const data = await attendanceStore.getDepartmentStats()
  departmentData.value = data.map(item => ({
    ...item,
    attendanceRate: parseFloat((item.normal / item.total * 100).toFixed(1))
  }))
}

const getProgressColor = (percentage) => {
  if (percentage >= 90) {
    return '#67C23A'
  } else if (percentage >= 70) {
    return '#E6A23C'
  } else {
    return '#F56C6C'
  }
}

const viewDetail = (row) => {
  // 查看部门详情逻辑
  console.log('View department:', row)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.department-stats {
  padding: 20px;
}
</style>
