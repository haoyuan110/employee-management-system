<template>
  <div class="business-apply-view">
    <el-card>
      <template #header>
        <div class="header">
          <h3>出差申请</h3>
        </div>
      </template>
      <BusinessApplyForm @success="handleSuccess" />
    </el-card>
  </div>
</template>

<script setup>
import BusinessApplyForm from '@/components/business/BusinessApplyForm.vue'


</script>

<style scoped>
.business-apply-view {
  padding: 20px;
}
</style>
