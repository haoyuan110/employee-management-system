<template>
  <div class="department-stats-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>部门统计</h3>
        </div>
      </template>
      <DepartmentStats />
    </el-card>
  </div>
</template>

<script setup>
import DepartmentStats from '@/components/statistics/DepartmentStats.vue'
</script>

<style scoped>
.department-stats-view {
  padding: 20px;
}
</style>
