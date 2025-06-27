<template>
  <div class="notice-detail-view">
    <el-button type="text" icon="arrow-left" @click="handleBack">返回</el-button>
    <NoticeDetail />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NoticeDetail from '@/components/notice/NoticeDetail.vue'

const router = useRouter()

const handleBack = () => {
  router.push('/notice')
}
</script>

<style scoped>
.notice-detail-view {
  padding: 20px;
}

.el-button {
  margin-bottom: 20px;
}
</style>
