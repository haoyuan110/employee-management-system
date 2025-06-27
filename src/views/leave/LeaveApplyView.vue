<template>
  <div class="leave-apply-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>请假申请</h3>
        </div>
      </template>
      <LeaveApplyForm @success="handleSuccess" />
    </el-card>
  </div>
</template>

<script setup>
import LeaveApplyForm from '@/components/leave/LeaveApplyForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSuccess = () => {
  router.push('/leave')
}
</script>

<style scoped>
.leave-apply-view {
  padding: 20px;
}
</style>
