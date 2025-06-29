<template>
  <div class="role-manage-view">
    <h2 class="page-title">角色管理</h2>
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="showAddRoleDialog">添加角色</el-button>
      </div>
      <el-table :data="roles" border style="width: 100%">
        <el-table-column prop="name" label="角色名称" width="180" />
        <el-table-column prop="code" label="角色编码" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'">
              {{ row.status ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button
              type="text"
              @click="handleStatusChange(row)"
              :style="{ color: row.status ? '#F56C6C' : '#67C23A' }"
            >
              {{ row.status ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const roles = ref([
  {
    id: 0,
    name: '管理员',
    code: 'admin',
    description: '系统管理员，拥有所有权限',
    status: true
  },
  {
    id: 1,
    name: '部门经理',
    code: 'manager',
    description: '部门经理，拥有部门管理权限',
    status: true
  },
  {
    id: 2,
    name: '普通员工',
    code: 'staff',
    description: '普通员工，拥有基本权限',
    status: true
  }
])

const showAddRoleDialog = () => {
  // 显示添加角色对话框
  console.log('Show add role dialog')
}

const handleEdit = (role) => {
  // 编辑角色
  console.log('Edit role:', role)
}

const handleStatusChange = (role) => {
  role.status = !role.status
  ElMessage.success('状态更新成功')
}

onMounted(() => {
  // 加载角色数据
})
</script>

<style scoped>
.role-manage-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.toolbar {
  margin-bottom: 20px;
}
</style>
