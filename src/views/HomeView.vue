<template>
  <div class="home-view">
    <h2 class="page-title">工作台</h2>
    <div class="grid">
      <div class="col-12">
        <ProfileCard />
      </div>
      <div class="col-12">
        <AttendanceCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from '@/components/home/ProfileCard.vue'
import AttendanceCard from '@/components/home/AttendanceCard.vue'
</script>

<style scoped>
.home-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.col-12 {
  grid-column: span 12;
}
</style>
