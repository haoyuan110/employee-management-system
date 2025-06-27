<template>
  <div class="notice-list">
    <div class="toolbar">
      <el-button type="primary" @click="handleCreate">发布公告</el-button>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="标题">
          <el-input
            v-model="searchForm.title"
            placeholder="请输入公告标题"
            clearable
          />
        </el-form-item>
        <el-form-item label="发布人">
          <el-input
            v-model="searchForm.publisher"
            placeholder="请输入发布人"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="notices" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容">
        <template #default="{ row }">
          <div class="content-preview">{{ row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="publisher" label="发布人" width="120" />
      <el-table-column prop="publishTime" label="发布时间" width="180">
        <template #default="{ row }">
          {{ formatDateTime(row.publishTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'info'">
            {{ row.status === 'published' ? '已发布' : '已撤回' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleView(row)">查看</el-button>
          <el-button
            v-if="row.status === 'published'"
            type="text"
            @click="handleRevoke(row)"
          >
            撤回
          </el-button>
          <el-button
            type="text"
            @click="handleDelete(row)"
            style="color: #f56c6c"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="fetchData"
        @current-change="fetchData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useNoticeStore } from '@/stores/notice'
import { formatDateTime } from '@/utils/date'
import { ElMessage, ElMessageBox } from 'element-plus'

const noticeStore = useNoticeStore()

const searchForm = reactive({
  title: '',
  publisher: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const notices = ref([])

const fetchData = async () => {
  const params = {
    page: pagination.currentPage,
    size: pagination.pageSize,
    title: searchForm.title,
    publisher: searchForm.publisher
  }

  const res = await noticeStore.getNotices(params)
  notices.value = res.data
  pagination.total = res.total
}

const handleSearch = () => {
  pagination.currentPage = 1
  fetchData()
}

const resetSearch = () => {
  searchForm.title = ''
  searchForm.publisher = ''
  handleSearch()
}

const handleCreate = () => {
  // 跳转到创建公告页面
  emit('create-notice')
}

const handleView = (row) => {
  // 查看公告详情
  emit('view-notice', row.id)
}

const handleRevoke = async (row) => {
  try {
    await ElMessageBox.confirm('确定要撤回该公告吗？', '提示', {
      type: 'warning'
    })
    await noticeStore.revokeNotice(row.id)
    ElMessage.success('撤回成功')
    fetchData()
  } catch (error) {
    if (error === 'cancel') return
    ElMessage.error('撤回失败')
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该公告吗？', '提示', {
      type: 'warning'
    })
    await noticeStore.deleteNotice(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    if (error === 'cancel') return
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.notice-list {
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.content-preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
