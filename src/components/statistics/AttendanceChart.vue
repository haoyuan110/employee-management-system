<template>
  <div class="attendance-chart">
    <div class="chart-header">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="统计类型">
          <el-select v-model="searchForm.type" placeholder="请选择统计类型">
            <el-option
              v-for="item in chartTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="chart-container">
      <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { useAttendanceStore } from '@/stores/attendance'
import { formatDate } from '@/utils/date'

const attendanceStore = useAttendanceStore()
const chartRef = ref(null)
let chartInstance = null

const searchForm = reactive({
  type: 'department',
  dateRange: []
})

const chartTypes = [
  { value: 'department', label: '部门统计' },
  { value: 'personal', label: '个人统计' },
  { value: 'monthly', label: '月度趋势' }
]

const initChart = () => {
  chartInstance = echarts.init(chartRef.value)

  const option = {
    title: {
      text: '考勤统计图表',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['正常', '迟到', '早退', '缺勤'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['开发部', '设计部', '产品部', '市场部', '人力资源部']
    },
    yAxis: {
      type: 'value',
      name: '人数'
    },
    series: [
      {
        name: '正常',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90]
      },
      {
        name: '迟到',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [5, 8, 3, 7, 2]
      },
      {
        name: '早退',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [3, 2, 1, 4, 1]
      },
      {
        name: '缺勤',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [2, 1, 0, 3, 1]
      }
    ]
  }

  chartInstance.setOption(option)
}

const handleSearch = async () => {
  const params = {
    type: searchForm.type,
    startDate: searchForm.dateRange[0] ? formatDate(searchForm.dateRange[0]) : '',
    endDate: searchForm.dateRange[1] ? formatDate(searchForm.dateRange[1]) : ''
  }

  const data = await attendanceStore.getAttendanceStats(params)
  updateChart(data)
}

const updateChart = (data) => {
  // 根据实际数据更新图表
  const option = chartInstance.getOption()
  option.xAxis[0].data = data.labels
  option.series[0].data = data.normal
  option.series[1].data = data.late
  option.series[2].data = data.early
  option.series[3].data = data.absent
  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
  handleSearch()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped>
.attendance-chart {
  padding: 20px;
}

.chart-header {
  margin-bottom: 20px;
}

.chart-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
