<template>
  <div class="leave-approve-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>请假审批</h3>
        </div>
      </template>
      <el-table :data="approveList" border style="width: 100%">
        <el-table-column prop="leaveEmpName" label="申请人" width="120" />
        <el-table-column prop="leaveDate" label="请假日期" width="120">
          <template #default="{ row }">
            {{ formatDate(row.holidayDate) }}
          </template>
        </el-table-column>
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
import { useLeaveStore } from '@/stores/leave'
import { formatDate } from '@/utils/date'

const leaveStore = useLeaveStore()
const approveList = ref([])

const fetchApproveList = async () => {
  // 添加默认页码参数 (pageNum=1, pageSize=10) 和 状态过滤 (isApprove=0)
  const pageNum = 1
  const pageSize = 10
  const isApprove = 0
  const res = await leaveStore.getRecords({ pageNum, pageSize, isApprove })
  approveList.value = res.data.records
}

const handleApprove = async (row, isApprove) => {
  try {
    await leaveStore.approveHoliday({
      holidayId: row.holidayId,
      isPass: isApprove ? 1 : 0
    })
    ElMessage.success('操作成功')
    await fetchApproveList()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

onMounted(() => {
  fetchApproveList()
})
</script>