<template>
  <div class="overtime-view">
    <h2 class="page-title">加班管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="我的加班" name="my">
        <OvertimeList />
      </el-tab-pane>
      <el-tab-pane label="申请加班" name="apply">
        <OvertimeApplyView />
      </el-tab-pane>
      <el-tab-pane label="加班审批" name="approve" v-if="isManager">
        <OvertimeApproveView />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/auth'
import OvertimeList from '@/components/overtime/OvertimeList.vue'
import OvertimeApplyView from '@/views/overtime/OvertimeApplyView.vue'
import OvertimeApproveView from '@/views/overtime/OvertimeApproveView.vue'

const userStore = useUserStore()
const activeTab = ref('my')

const isManager = computed(() => {
  return userStore.roles.includes('manager')
})
</script>

<style scoped>
.overtime-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
