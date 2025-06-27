<template>
  <div class="notice-view">
    <div class="header">
      <h2 class="page-title">公告管理</h2>
      <el-button type="primary" @click="handleCreate">发布公告</el-button>
    </div>
    <NoticeList @create-notice="handleCreate" @view-notice="handleView" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NoticeList from '@/components/notice/NoticeList.vue'

const router = useRouter()

const handleCreate = () => {
  router.push('/notice/create')
}

const handleView = (id) => {
  router.push(`/notice/detail/${id}`)
}
</script>

<style scoped>
.notice-view {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}
</style>
