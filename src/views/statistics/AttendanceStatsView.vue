<template>
  <div class="attendance-stats-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>考勤统计</h3>
        </div>
      </template>
      <AttendanceChart />
    </el-card>
  </div>
</template>

<script setup>
import AttendanceChart from '@/components/statistics/AttendanceChart.vue'
</script>

<style scoped>
.attendance-stats-view {
  padding: 20px;
}
</style>
