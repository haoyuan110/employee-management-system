<template>
  <div class="employee-view">
    <div class="header">
      <h2 class="page-title">员工管理</h2>
      <el-button type="primary" @click="showAddDialog">添加员工</el-button>
    </div>
    <EmployeeTable @show-add-dialog="showAddDialog" @edit-employee="handleEdit"/>
    <AddEmployeeView
        v-model="showAddDialogVisible"
        :employee-data="currentEmployee"
        :is-edit="isEdit"
        @success="handleSuccess"
    />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import EmployeeTable from '@/components/employee/EmployeeTable.vue'
import AddEmployeeView from '@/views/employee/AddEmployeeView.vue'
import api from "@/utils/api.js";

const showAddDialogVisible = ref(false)
const currentEmployee = ref({})
const isEdit = ref(false)

const showAddDialog = () => {
  isEdit.value = false
  currentEmployee.value = {}
  showAddDialogVisible.value = true
}

const handleEdit = (employee) => {
  isEdit.value = true
  currentEmployee.value = {...employee}
  showAddDialogVisible.value = true
}

const handleSuccess = () => {
  showAddDialogVisible.value = false
}

</script>

<style scoped>
.employee-view {
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
