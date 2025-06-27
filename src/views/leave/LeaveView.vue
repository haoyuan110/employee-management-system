<template>
  <div class="leave-view">
    <h2 class="page-title">请假管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="我的请假" name="my">
        <LeaveList />
      </el-tab-pane>
      <el-tab-pane label="申请请假" name="apply">
        <LeaveApplyView />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LeaveList from '@/components/leave/LeaveList.vue'
import LeaveApplyView from './LeaveApplyView.vue'

const activeTab = ref('my')
</script>

<style scoped>
.leave-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
