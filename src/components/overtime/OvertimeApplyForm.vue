<template>
  <el-form
    ref="overtimeForm"
    :model="formData"
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item label="加班日期" prop="date">
      <el-date-picker
        v-model="formData.overtimeDate"
        type="date"
        placeholder="选择加班日期"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="加班原因" prop="reason">
      <el-input
        v-model="formData.reason"
        type="textarea"
        :rows="3"
        placeholder="请输入加班原因"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交申请</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useOvertimeStore } from '@/stores/overtime'
import { ElMessage } from 'element-plus'

const overtimeStore = useOvertimeStore()
const overtimeForm = ref(null)

const formData = reactive({
  overtimeDate: '',
  reason: ''
})

const rules = reactive({
  overtimeDate: [{ required: true, message: '请选择加班日期', trigger: 'change' }],
  reason: [{ required: true, message: '请输入加班原因', trigger: 'blur' }]
})

const submitForm = async () => {
  try {
    await overtimeForm.value.validate()
    await overtimeStore.applyOvertime(formData)
    ElMessage.success('加班申请提交成功')
    resetForm()
  } catch (error) {
    if (!error) return
    ElMessage.error('提交失败，请检查表单')
  }
}

const resetForm = () => {
  overtimeForm.value.resetFields()
}
</script>

<style scoped>
.el-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
