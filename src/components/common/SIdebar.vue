<template>
  <el-menu
    :default-active="activeMenu"
    class="sidebar-menu"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    router
    unique-opened
    :collapse="isCollapse"
  >
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

const routes = [
  {
    path: '/home',
    meta: { title: '首页', icon: 'home' }
  },
  {
    path: '/employee',
    meta: { title: '员工管理', icon: 'user' },
    children: [
      { path: 'list', meta: { title: '员工列表' } },
      { path: 'add', meta: { title: '添加员工' } },
      { path: 'roles', meta: { title: '角色管理' } }
    ]
  },
  {
    path: '/overtime',
    meta: { title: '加班管理', icon: 'clock' },
    children: [
      { path: 'apply', meta: { title: '加班申请' } },
      { path: 'records', meta: { title: '加班记录' } },
      { path: 'approve', meta: { title: '加班审批' } }
    ]
  },
  {
    path: '/statistics',
    meta: { title: '统计管理', icon: 'data-analysis' },
    children: [
      { path: 'attendance', meta: { title: '考勤统计' } },
      { path: 'charts', meta: { title: '图表统计' } },
      { path: 'department', meta: { title: '部门统计' } }
    ]
  },
  {
    path: '/leave',
    meta: { title: '请假管理', icon: 'calendar' }
  },
  {
    path: '/business',
    meta: { title: '出差管理', icon: 'plane' }
  },
  {
    path: '/notice',
    meta: { title: '公告管理', icon: 'message' }
  }
]

const activeMenu = computed(() => {
  const { path } = route
  return path
})

const isCollapse = computed(() => appStore.sidebar.collapse)
</script>

<style scoped>
.sidebar-menu {
  height: 100%;
  border-right: none;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 210px;
}
</style>
