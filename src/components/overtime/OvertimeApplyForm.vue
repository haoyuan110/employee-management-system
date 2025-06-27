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
        v-model="formData.date"
        type="date"
        placeholder="选择加班日期"
        style="width: 100%"
      />
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker
            v-model="formData.startTime"
            placeholder="选择开始时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结束时间" prop="endTime">
          <el-time-picker
            v-model="formData.endTime"
            placeholder="选择结束时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="加班类型" prop="type">
      <el-select
        v-model="formData.type"
        placeholder="请选择加班类型"
        style="width: 100%"
      >
        <el-option
          v-for="item in overtimeTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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

const overtimeTypes = [
  { value: 'weekday', label: '平日加班' },
  { value: 'weekend', label: '周末加班' },
  { value: 'holiday', label: '节假日加班' },
  { value: 'emergency', label: '紧急加班' }
]

const formData = reactive({
  date: '',
  startTime: '',
  endTime: '',
  type: '',
  reason: ''
})

const rules = reactive({
  date: [{ required: true, message: '请选择加班日期', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
  type: [{ required: true, message: '请选择加班类型', trigger: 'change' }],
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
