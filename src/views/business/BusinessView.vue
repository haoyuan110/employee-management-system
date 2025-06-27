<template>
  <div class="business-view">
    <h2 class="page-title">出差管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="我的出差" name="my">
        <BusinessList />
      </el-tab-pane>
      <el-tab-pane label="申请出差" name="apply">
        <BusinessApplyView />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BusinessList from '@/components/business/BusinessList.vue'
import BusinessApplyView from './BusinessApplyView.vue'

const activeTab = ref('my')
</script>

<style scoped>
.business-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
