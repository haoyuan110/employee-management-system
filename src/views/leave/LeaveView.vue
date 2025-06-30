<template>
  <div class="leave-view">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="我的请假" name="my">
        <LeaveList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import LeaveList from '@/components/leave/LeaveList.vue'

const activeTab = ref('my')
</script>

<style scoped>
.leave-view {
  padding: 20px;
}

</style>
