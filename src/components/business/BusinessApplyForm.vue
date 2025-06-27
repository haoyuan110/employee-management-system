<template>
  <el-form
    ref="businessForm"
    :model="formData"
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item label="出差地点" prop="destination">
      <el-input v-model="formData.destination" placeholder="请输入出差地点" />
    </el-form-item>
    <el-form-item label="出差时间" required>
      <el-col :span="11">
        <el-form-item prop="startDate">
          <el-date-picker
            v-model="formData.startDate"
            type="datetime"
            placeholder="选择开始日期时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="2" class="text-center">-</el-col>
      <el-col :span="11">
        <el-form-item prop="endDate">
          <el-date-picker
            v-model="formData.endDate"
            type="datetime"
            placeholder="选择结束日期时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="出差天数" prop="days">
      <el-input-number
        v-model="formData.days"
        :min="1"
        :step="1"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="出差事由" prop="reason">
      <el-input
        v-model="formData.reason"
        type="textarea"
        :rows="3"
        placeholder="请输入出差事由"
      />
    </el-form-item>
    <el-form-item label="预算金额" prop="budget">
      <el-input-number
        v-model="formData.budget"
        :min="0"
        :precision="2"
        :step="100"
        controls-position="right"
      >
        <template #prefix>¥</template>
      </el-input-number>
    </el-form-item>
    <el-form-item label="同行人员" prop="companions">
      <el-select
        v-model="formData.companions"
        multiple
        filterable
        placeholder="请选择同行人员"
        style="width: 100%"
      >
        <el-option
          v-for="employee in employeeList"
          :key="employee.id"
          :label="employee.name"
          :value="employee.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交申请</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useBusinessStore } from '@/stores/business'
import { useEmployeeStore } from '@/stores/employee'
import { ElMessage } from 'element-plus'

const businessStore = useBusinessStore()
const employeeStore = useEmployeeStore()
const businessForm = ref(null)

const employeeList = ref([])

const formData = reactive({
  destination: '',
  startDate: '',
  endDate: '',
  days: 1,
  reason: '',
  budget: 0,
  companions: []
})

const rules = reactive({
  destination: [
    { required: true, message: '请输入出差地点', trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  endDate: [
    { required: true, message: '请选择结束时间', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value && formData.startDate && new Date(value) <= new Date(formData.startDate)) {
          callback(new Error('结束时间必须晚于开始时间'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  days: [{ required: true, message: '请输入出差天数', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入出差事由', trigger: 'blur' }],
  budget: [{ required: true, message: '请输入预算金额', trigger: 'blur' }]
})

const fetchEmployees = async () => {
  const res = await employeeStore.getEmployees({ page: 1, size: 100 })
  employeeList.value = res.data
}

const submitForm = async () => {
  try {
    await businessForm.value.validate()
    await businessStore.applyBusiness(formData)
    ElMessage.success('出差申请提交成功')
    resetForm()
  } catch (error) {
    if (!error) return
    ElMessage.error('提交失败，请检查表单')
  }
}

const resetForm = () => {
  businessForm.value.resetFields()
}

onMounted(() => {
  fetchEmployees()
})
</script>

<style scoped>
.el-form {
  max-width: 800px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
  line-height: 40px;
}
</style>
