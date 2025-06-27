<template>
  <div class="chart-stats-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>图表统计</h3>
        </div>
      </template>
      <div class="chart-container">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <h4>月度考勤趋势</h4>
              <div ref="attendanceTrendChart" style="height: 300px;"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <h4>部门考勤对比</h4>
              <div ref="departmentCompareChart" style="height: 300px;"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const attendanceTrendChart = ref(null)
const departmentCompareChart = ref(null)
let trendChartInstance = null
let compareChartInstance = null

const initCharts = () => {
  // 初始化趋势图
  trendChartInstance = echarts.init(attendanceTrendChart.value)
  trendChartInstance.setOption({
    title: {
      text: '月度考勤趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['正常', '迟到', '早退', '缺勤'],
      bottom: 10
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '正常',
        type: 'line',
        data: [120, 132, 101, 134, 90, 130]
      },
      {
        name: '迟到',
        type: 'line',
        data: [5, 8, 3, 7, 2, 4]
      },
      {
        name: '早退',
        type: 'line',
        data: [3, 2, 1, 4, 1, 2]
      },
      {
        name: '缺勤',
        type: 'line',
        data: [2, 1, 0, 3, 1, 2]
      }
    ]
  })

  // 初始化对比图
  compareChartInstance = echarts.init(departmentCompareChart.value)
  compareChartInstance.setOption({
    title: {
      text: '部门考勤对比',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['开发部', '设计部', '产品部', '市场部', '人力资源部'],
      bottom: 10
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['正常率', '迟到率', '早退率', '缺勤率']
    },
    series: [
      {
        name: '开发部',
        type: 'bar',
        data: [95, 3, 1, 1]
      },
      {
        name: '设计部',
        type: 'bar',
        data: [93, 4, 2, 1]
      },
      {
        name: '产品部',
        type: 'bar',
        data: [96, 2, 1, 1]
      },
      {
        name: '市场部',
        type: 'bar',
        data: [90, 5, 3, 2]
      },
      {
        name: '人力资源部',
        type: 'bar',
        data: [98, 1, 0, 1]
      }
    ]
  })
}

const handleResize = () => {
  trendChartInstance?.resize()
  compareChartInstance?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  trendChartInstance?.dispose()
  compareChartInstance?.dispose()
})
</script>

<style scoped>
.chart-stats-view {
  padding: 20px;
}

.chart-container {
  margin-top: 20px;
}

h4 {
  margin: 0 0 15px 0;
  text-align: center;
}
</style>
