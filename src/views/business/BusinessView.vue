<template>
  <div class="business-view">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="出差记录" name="my">
        <BusinessList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import BusinessList from '@/components/business/BusinessList.vue'

const activeTab = ref('my')
</script>

<style scoped>
.business-view {
  padding: 20px;
}

</style>
