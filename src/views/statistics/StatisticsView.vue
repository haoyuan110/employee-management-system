<template>
  <div class="statistics-view">
    <h2 class="page-title">统计管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="考勤统计" name="attendance">
        <AttendanceStatsView />
      </el-tab-pane>
      <el-tab-pane label="图表统计" name="chart">
        <ChartStatsView />
      </el-tab-pane>
      <el-tab-pane label="部门统计" name="department">
        <DepartmentStatsView />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AttendanceStatsView from './AttendanceStatsView.vue'
import ChartStatsView from './ChartStatsView.vue'
import DepartmentStatsView from './DepartmentStatsView.vue'

const activeTab = ref('attendance')
</script>

<style scoped>
.statistics-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
