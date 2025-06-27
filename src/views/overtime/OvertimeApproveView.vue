<template>
  <div class="overtime-approve-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>加班审批</h3>
        </div>
      </template>
      <el-table :data="approveList" border style="width: 100%">
        <el-table-column prop="employeeName" label="申请人" width="120" />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column label="时间段" width="180">
          <template #default="{ row }">
            {{ row.startTime }} - {{ row.endTime }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="时长(小时)" width="120" />
        <el-table-column prop="reason" label="原因" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="text" @click="handleApprove(row, true)">同意</el-button>
            <el-button type="text" @click="handleApprove(row, false)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useOvertimeStore } from '@/stores/overtime'

const overtimeStore = useOvertimeStore()
const approveList = ref([])

const fetchApproveList = async () => {
  const res = await overtimeStore.getApproveList()
  approveList.value = res.data
}

const handleApprove = async (row, isApprove) => {
  try {
    await overtimeStore.approveOvertime({
      id: row.id,
      status: isApprove ? 'approved' : 'rejected'
    })
    ElMessage.success('操作成功')
    fetchApproveList()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

onMounted(() => {
  fetchApproveList()
})
</script>

<style scoped>
.overtime-approve-view {
  padding: 20px;
}
</style>
