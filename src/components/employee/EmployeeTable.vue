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
          <el-button :icon="Search" @click="handleSearch"/>
        </template>
      </el-input>
    </div>
    <el-table :data="filteredEmployees" border style="width: 100%">
      <el-table-column prop="employeeId" label="工号" width="60"/>
      <el-table-column prop="employeeName" label="姓名" width="90"/>
      <el-table-column prop="gender" label="性别" width="60">
        <template #default="{ row }">
          {{ row.gender === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="departmentId" label="部门名字" width="90">
        <template #default="{ row }">
          {{ departmentName(row.departmentId) }}
        </template>
      </el-table-column>
      <el-table-column prop="job" label="职位" width="120"/>
      <el-table-column prop="phone" label="电话" width="150"/>
      <el-table-column prop="email" label="邮箱" width="200"/>
      <el-table-column prop="birthday" label="生日" width="120"/>
      <el-table-column prop="salary" label="薪资" width="120"/>
      <el-table-column prop="employeeRole" label="权限" width="120">
        <template #default="{ row }">
          <el-tag :type="row.employeeRole === 0 ? 'success' : row.employeeRole === 1 ? 'warning' : 'info'">
            {{
              row.employeeRole === 0 ? '系统管理员' :
                  row.employeeRole === 1 ? '部门经理' :
                      '普通员工'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="入职时间" width="120"/>
      <el-table-column prop="updateTime" label="更新时间" width="120"/>

      <el-table-column label="操作" width="150">
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
import {ref, computed, onMounted} from 'vue'
import {Search} from '@element-plus/icons-vue'
import {useEmployeeStore} from '@/stores/employee'
import {ElMessage} from "element-plus";

// 定义 emit
const emit = defineEmits(['show-add-dialog', 'edit-employee'])

const employeeStore = useEmployeeStore()

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchQuery = ref('')

// 加载员工列表
const fetchEmployees = async () => {
  await employeeStore.getEmployees({
    pageNum: currentPage.value,
    pageSize: pageSize.value
  })
  total.value = employeeStore.total
}

const filteredEmployees = computed(() => {
  if (!searchQuery.value) {
    return employeeStore.employees
  }

  const query = searchQuery.value.toLowerCase()

  return employeeStore.employees.filter(employee => {
    const name = employee.employeeName?.toLowerCase() || ''
    const id = employee.employeeId?.toString?.() || ''

    return name.includes(query) || id.includes(query)
  })
})

// 搜索功能（支持工号或姓名）
const handleSearch = () => {
  if (searchQuery.value) {
    const result = employeeStore.employees.filter(emp =>
        emp.employeeName.includes(searchQuery.value) ||
        emp.employeeId.toString().includes(searchQuery.value)
    )
    filteredEmployees.value = result
  } else {
    fetchEmployees()
  }
}

// 清除搜索条件
const handleSearchClear = () => {
  searchQuery.value = ''
  fetchEmployees()
}

// 显示添加对话框
const showAddDialog = () => {
  emit('show-add-dialog')
}

// 编辑员工
const handleEdit = (employee) => {
  emit('edit-employee', employee)
}

// 删除员工
const handleDelete = async (employee) => {
  try {
    await employeeStore.deleteEmployee(employee.employeeId)
    ElMessage.success('删除成功')
    await fetchEmployees()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 部门ID到名称的映射
const departmentMap = {
  1: '产品部',
  2: '设计部',
  3: '技术部',
  4: '运营部',
  5: '客服部',
  6: '市场部',
  7: '商务部',
  8: '公关部',
  9: '品牌部',
  10: '财务部',
  11: '人力部',
  12: '行政部'
}

// 获取部门名称
const departmentName = (departmentId) => {
  return departmentMap[departmentId] || ''
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