<template>
  <div class="notice-detail">
    <el-card>
      <template #header>
        <div class="header">
          <h2>{{ notice.title }}</h2>
          <div class="meta">
            <span class="publisher">发布人：{{ notice.publisher }}</span>
            <span class="time">发布时间：{{ formatDateTime(notice.publishTime) }}</span>
            <el-tag :type="notice.status === 'published' ? 'success' : 'info'">
              {{ notice.status === 'published' ? '已发布' : '已撤回' }}
            </el-tag>
          </div>
        </div>
      </template>
      <div class="content" v-html="notice.content"></div>
      <div v-if="notice.attachments && notice.attachments.length > 0" class="attachments">
        <h3>附件：</h3>
        <ul>
          <li v-for="file in notice.attachments" :key="file.id">
            <el-link type="primary" :href="file.url" target="_blank">
              {{ file.name }}
            </el-link>
            <span class="size">({{ formatFileSize(file.size) }})</span>
          </li>
        </ul>
      </div>
    </el-card>
    <div class="actions">
      <el-button type="primary" @click="handleBack">返回</el-button>
      <el-button
        v-if="notice.status === 'published'"
        type="danger"
        @click="handleRevoke"
      >
        撤回公告
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoticeStore } from '@/stores/notice'
import { formatDateTime } from '@/utils/date'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const noticeStore = useNoticeStore()

const notice = ref({
  id: '',
  title: '',
  content: '',
  publisher: '',
  publishTime: '',
  status: '',
  attachments: []
})

const fetchNoticeDetail = async () => {
  const id = route.params.id
  if (!id) return

  const data = await noticeStore.getNoticeDetail(id)
  notice.value = data
}

const handleBack = () => {
  router.push('/notice')
}

const handleRevoke = async () => {
  try {
    await ElMessageBox.confirm('确定要撤回该公告吗？', '提示', {
      type: 'warning'
    })
    await noticeStore.revokeNotice(notice.value.id)
    ElMessage.success('撤回成功')
    fetchNoticeDetail()
  } catch (error) {
    if (error === 'cancel') return
    ElMessage.error('撤回失败')
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

onMounted(() => {
  fetchNoticeDetail()
})
</script>

<style scoped>
.notice-detail {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.header h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.meta {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
}

.meta span {
  margin-right: 15px;
}

.content {
  line-height: 1.8;
  font-size: 16px;
}

.attachments {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.attachments ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.attachments li {
  margin-bottom: 8px;
}

.attachments .size {
  color: #999;
  margin-left: 8px;
}

.actions {
  margin-top: 20px;
  text-align: center;
}
</style>
