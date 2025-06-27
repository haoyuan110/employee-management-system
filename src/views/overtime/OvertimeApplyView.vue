<template>
  <div class="overtime-apply-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>加班申请</h3>
        </div>
      </template>
      <OvertimeApplyForm />
    </el-card>
  </div>
</template>

<script setup>
import OvertimeApplyForm from '@/components/overtime/OvertimeApplyForm.vue'
</script>

<style scoped>
.overtime-apply-view {
  padding: 20px;
}
</style>
