<template>
  <div class="employee-table">
    <div class="table-header">
      <el-button type="primary" @click="showAddDialog">添加员工</el-button>
      <el-input
        v-model="searchQuery"
        placeholder="搜索员工姓名或工号"
        style="width: 240px"
        clearable
        @clear="handleSearchClear"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch" />
        </template>
      </el-input>
    </div>
    <el-table :data="filteredEmployees" border style="width: 100%">
      <el-table-column prop="employeeId" label="工号" width="100" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="gender" label="性别" width="80">
        <template #default="{ row }">
          {{ row.gender === 'male' ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" width="150" />
      <el-table-column prop="position" label="职位" width="150" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '在职' : '离职' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next, sizes, total"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="fetchEmployees"
        @current-change="fetchEmployees"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useEmployeeStore } from '@/stores/employee'

const employeeStore = useEmployeeStore()

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchQuery = ref('')

const filteredEmployees = computed(() => {
  if (!searchQuery.value) {
    return employeeStore.employees
  }
  return employeeStore.employees.filter(employee => {
    return (
      employee.name.includes(searchQuery.value) ||
      employee.employeeId.includes(searchQuery.value)
    )
  })
})

const fetchEmployees = async () => {
  await employeeStore.fetchEmployees({
    page: currentPage.value,
    size: pageSize.value
  })
  total.value = employeeStore.total
}

const handleSearch = () => {
  // Search is handled by computed property
}

const handleSearchClear = () => {
  searchQuery.value = ''
}

const showAddDialog = () => {
  // Emit event to parent to show add dialog
  emit('show-add-dialog')
}

const handleEdit = (employee) => {
  // Emit event to parent to show edit dialog
  emit('edit-employee', employee)
}

const handleDelete = async (employee) => {
  try {
    await employeeStore.deleteEmployee(employee.id)
    ElMessage.success('删除成功')
    fetchEmployees()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  fetchEmployees()
})
</script>

<style scoped>
.employee-table {
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
