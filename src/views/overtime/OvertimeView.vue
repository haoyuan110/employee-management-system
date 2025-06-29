<template>
  <div class="overtime-view">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="加班记录" name="my">
        <OvertimeList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import OvertimeList from '@/components/overtime/OvertimeList.vue'

const activeTab = ref('my')

</script>

<style scoped>
.overtime-view {
  padding: 20px;
}

</style>
