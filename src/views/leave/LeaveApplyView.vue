<template>
  <div class="leave-apply-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>请假申请</h3>
        </div>
      </template>
      <LeaveApplyForm/>
    </el-card>
  </div>
</template>

<script setup>
import LeaveApplyForm from '@/components/leave/LeaveApplyForm.vue'

</script>

<style scoped>
.leave-apply-view {
  padding: 20px;
}
</style>
