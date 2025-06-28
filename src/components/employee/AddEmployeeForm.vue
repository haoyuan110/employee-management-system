<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="员工姓名">
      <el-input v-model="form.employeeName" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.gender">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" />
    </el-form-item>
    <el-form-item label="部门">
      <el-select v-model="form.departmentId" placeholder="请选择部门">
        <el-option
            v-for="dept in departments"
            :key="dept.id"
            :label="dept.name"
            :value="dept.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="form.job" />
    </el-form-item>
    <el-form-item label="薪资">
      <el-input-number v-model="form.salary" :precision="2" />
    </el-form-item>
    <el-form-item label="权限">
      <el-select v-model="form.employeeRole" placeholder="请选择权限">
        <el-option label="系统管理员" :value="0" />
        <el-option label="部门经理" :value="1" />
        <el-option label="普通员工" :value="2" />
      </el-select>
    </el-form-item>
    <el-button @click="submitForm">{{ isEdit ? '保存' : '添加' }}</el-button>
  </el-form>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
import {ElMessage} from "element-plus";

const props = defineProps({
  employeeData: Object,
  isEdit: Boolean
})

const form = ref(props.isEdit ? { ...props.employeeData } : {
  employeeName: '',
  gender: 0,
  phone: '',
  email: '',
  birthday: null,
  departmentId: null,
  job: '',
  salary: 0,
  employeeRole: 2
})

const departments = [
  { id: 1, name: '开发部' },
  { id: 2, name: '设计部' },
  { id: 3, name: '产品部' },
  { id: 4, name: '市场部' },
  { id: 5, name: '人力资源部' }
]

const emit = defineEmits(['success'])
const employeeStore = useEmployeeStore()

const submitForm = async () => {
  try {
    if (props.isEdit) {
      await employeeStore.updateEmployee(form.value)
    } else {
      await employeeStore.addEmployee(form.value)
    }
    ElMessage.success(props.isEdit ? '更新成功' : '添加成功')
    emit('success')
  } catch (error) {
    ElMessage.error(props.isEdit ? '更新失败' : '添加失败')
  }
}
</script>

<style scoped>

</style>
