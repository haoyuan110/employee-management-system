<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑员工信息' : '添加新员工'"
    width="50%"
    @closed="resetForm"
  >
    <el-form
      ref="employeeForm"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工号" prop="employeeId">
        <el-input v-model="formData.employeeId" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select
          v-model="formData.department"
          placeholder="请选择部门"
          style="width: 100%"
        >
          <el-option
            v-for="dept in departments"
            :key="dept.value"
            :label="dept.label"
            :value="dept.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="formData.position" placeholder="请输入职位" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="入职日期" prop="joinDate">
        <el-date-picker
          v-model="formData.joinDate"
          type="date"
          placeholder="选择入职日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="active">在职</el-radio>
          <el-radio label="inactive">离职</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useEmployeeStore } from '@/stores/employee'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  employeeData: {
    type: Object,
    default: () => ({})
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'success'])

const employeeStore = useEmployeeStore()
const employeeForm = ref(null)

const departments = [
  { value: 'development', label: '开发部' },
  { value: 'design', label: '设计部' },
  { value: 'product', label: '产品部' },
  { value: 'marketing', label: '市场部' },
  { value: 'hr', label: '人力资源部' }
]

const formData = reactive({
  name: '',
  gender: 'male',
  employeeId: '',
  department: '',
  position: '',
  phone: '',
  email: '',
  joinDate: '',
  status: 'active'
})

const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  employeeId: [{ required: true, message: '请输入工号', trigger: 'blur' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ],
  joinDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }]
})

watch(
  () => props.visible,
  (val) => {
    if (val && props.isEdit) {
      Object.assign(formData, props.employeeData)
    }
  }
)

const submitForm = async () => {
  try {
    await employeeForm.value.validate()
    if (props.isEdit) {
      await employeeStore.updateEmployee(formData)
      ElMessage.success('更新成功')
    } else {
      await employeeStore.addEmployee(formData)
      ElMessage.success('添加成功')
    }
    emit('success')
    visible.value = false
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const resetForm = () => {
  employeeForm.value.resetFields()
  Object.keys(formData).forEach(key => {
    formData[key] = props.isEdit ? props.employeeData[key] : ''
  })
  if (!props.isEdit) {
    formData.gender = 'male'
    formData.status = 'active'
  }
  emit('update:visible', false)
}

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
