<template>
  <el-form
    ref="leaveForm"
    :model="formData"
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item label="请假类型" prop="type">
      <el-select
        v-model="formData.type"
        placeholder="请选择请假类型"
        style="width: 100%"
      >
        <el-option
          v-for="item in leaveTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="请假时间" required>
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
    <el-form-item label="请假天数" prop="days">
      <el-input-number
        v-model="formData.days"
        :min="0.5"
        :step="0.5"
        :precision="1"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="请假原因" prop="reason">
      <el-input
        v-model="formData.reason"
        type="textarea"
        :rows="3"
        placeholder="请输入请假原因"
      />
    </el-form-item>
    <el-form-item label="证明材料" prop="files">
      <el-upload
        v-model:file-list="formData.files"
        action="/api/upload"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            请上传证明材料，支持jpg/png/pdf格式，不超过5MB
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交申请</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLeaveStore } from '@/stores/leave'
import { ElMessage } from 'element-plus'

const leaveStore = useLeaveStore()
const leaveForm = ref(null)

const leaveTypes = [
  { value: 'annual', label: '年假' },
  { value: 'sick', label: '病假' },
  { value: 'personal', label: '事假' },
  { value: 'marriage', label: '婚假' },
  { value: 'maternity', label: '产假' },
  { value: 'paternity', label: '陪产假' },
  { value: 'funeral', label: '丧假' }
]

const formData = reactive({
  type: '',
  startDate: '',
  endDate: '',
  days: 1,
  reason: '',
  files: []
})

const rules = reactive({
  type: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
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
  days: [{ required: true, message: '请输入请假天数', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入请假原因', trigger: 'blur' }]
})

const handleExceed = (files) => {
  ElMessage.warning(`最多上传3个文件，当前选择了 ${files.length} 个文件`)
}

const submitForm = async () => {
  try {
    await leaveForm.value.validate()
    await leaveStore.applyLeave(formData)
    ElMessage.success('请假申请提交成功')
    resetForm()
  } catch (error) {
    if (!error) return
    ElMessage.error('提交失败，请检查表单')
  }
}

const resetForm = () => {
  leaveForm.value.resetFields()
  formData.files = []
}
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
