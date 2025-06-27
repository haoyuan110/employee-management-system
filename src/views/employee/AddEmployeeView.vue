<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑员工信息' : '添加新员工'"
    width="50%"
    @closed="handleClose"
  >
    <AddEmployeeForm
      :employee-data="employeeData"
      :is-edit="isEdit"
      @success="handleSuccess"
    />
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import AddEmployeeForm from '@/components/employee/AddEmployeeForm.vue'

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

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const handleSuccess = () => {
  emit('success')
}

const handleClose = () => {
  emit('update:visible', false)
}
</script>
