<script setup lang="ts">
import { Location, Document, User, Folder, Notebook, Clock, MapLocation } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


const router = useRouter()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 查看个人信息
const viewProfile = () => {
  // 这里可以跳转到个人信息页面或打开个人信息对话框
  console.log('查看个人信息')
  router.push('/profile')
}

// 退出登录
const handleLogout = () => {
  // 清除登录状态
  localStorage.removeItem('token')
  ElMessage.success('已退出登录')
  router.push('/login')
}

</script>

<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-header class="main-header">
        <div class="header-content">
          <h1 class="system-title">企业内部管理系统</h1>
          <div class="user-info">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="user-name">管理员</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="viewProfile">
                    <el-icon><user /></el-icon>查看个人信息
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><switch-button /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container class="main-container">
        <el-aside width="220px" class="main-sidebar">
          <el-menu
              active-text-color="#409EFF"
              background-color="#001529"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#b7bdc3"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><document /></el-icon>
                <span>主页</span>
              </template>
              <el-menu-item index="1-1">查看个人信息</el-menu-item>
              <el-menu-item index="1-2">修改个人信息</el-menu-item>
              <el-menu-item index="1-3">进行自我考勤</el-menu-item>
              <el-menu-item index="1-4">查看考勤记录</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><user /></el-icon>
                <span>员工管理</span>
              </template>
              <router-link :to="{ path: '/employee' }" style="text-decoration: none;">
                <el-menu-item index="2-1">员工基本信息</el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><folder /></el-icon>
                <span>部门管理</span>
              </template>
              <el-menu-item index="3-1">部门基本信息</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><notebook /></el-icon>
                <span>请假管理</span>
              </template>
              <el-menu-item index="4-1">请假申请</el-menu-item>
              <el-menu-item index="4-2">请假记录</el-menu-item>
              <el-menu-item index="4-3">请假审批</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><clock /></el-icon>
                <span>加班管理</span>
              </template>
              <el-menu-item index="5-1">加班申请</el-menu-item>
              <el-menu-item index="5-2">加班记录</el-menu-item>
              <el-menu-item index="5-3">加班审批</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><map-location /></el-icon>
                <span>出差管理</span>
              </template>
              <el-menu-item index="6-1">出差申请</el-menu-item>
              <el-menu-item index="6-2">出差记录</el-menu-item>
              <el-menu-item index="6-3">出差审批</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container class="content-container">
          <el-main class="main-content">
            <div class="content-wrapper">
              <router-view />
            </div>
          </el-main>
          <el-footer class="main-footer">
            <div class="footer-content">
              © 2025 企业内部管理系统 - 技术支持
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.layout-container {
  height: 100%;
}

.main-header {
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 24px;
  display: flex;
  align-items: center;
  z-index: 9;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.system-title {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.main-container {
  height: calc(100% - 64px);
}

.main-sidebar {
  background-color: #001529;
  height: 100%;
  transition: all 0.3s;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 46px;
  line-height: 46px;
  margin: 4px 0;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  color: #fff !important;
}

.el-sub-menu__title {
  height: 50px;
  line-height: 50px;
}

.content-container {
  background-color: #f0f2f5;
}

.main-content {
  padding: 16px;
  background-color: #f0f2f5;
  overflow-y: auto;
}

.content-wrapper {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  min-height: calc(100% - 32px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.main-footer {
  height: 48px;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  color: #888;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-sidebar {
    width: 80px !important;
  }
  
  .el-sub-menu__title span,
  .el-menu-item {
    display: none;
  }
}
</style>