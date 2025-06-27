<template>
  <!-- 主应用容器 -->
  <div id="app">
    <!-- 路由过渡效果 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <!-- 布局组件 -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/auth'

const router = useRouter()
const authStore = useUserStore()

// 监听路由变化，设置页面标题
watch(() => router.currentRoute.value, (to) => {
  const title = to.meta.title || '员工管理系统'
  document.title = `${title} - 企业员工管理系统`
}, { immediate: true })

// 检查用户认证状态
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (!isAuthenticated && router.currentRoute.value.meta.requiresAuth) {
    router.push('/employee/login')
  }
})
</script>

<style lang="scss">
// 导入全局样式
@use "@/styles/variables" as *; // 导入变量文件

body {
  background-color: $background-color; // 现在变量已定义
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
               'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  min-height: 100vh;
  background-color: $background-color;
}

// 路由过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 全局滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}

// 全局工具类
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.mt-20 {
  margin-top: 20px;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
