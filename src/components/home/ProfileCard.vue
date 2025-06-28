<template>
  <el-card class="profile-card">
    <template #header>
      <div class="card-header">
        <span>个人信息</span>
        <el-button type="text" @click="editProfile">编辑</el-button>
      </div>
    </template>
    <div class="profile-content">
      <!--      <div class="avatar-container">-->
      <!--        <el-avatar :size="100" :src="user.avatar" />-->
      <!--      </div>-->
      <div class="profile-info">
        <div class="info-item">
          <span class="label">姓名：</span>
          <span class="value">{{ user.employeeName }}</span>
        </div>
        <div class="info-item">
          <span class="label">工号：</span>
          <span class="value">{{ user.employeeId }}</span>
        </div>
        <div class="info-item">
          <span class="label">部门id号：</span>
          <span class="value">{{ user.departmentId }}</span>
        </div>
        <div class="info-item">
          <span class="label">职位：</span>
          <span class="value">{{ user.job }}</span>
        </div>
        <div class="info-item">
          <span class="label">入职日期：</span>
          <span class="value">{{ user.createTime }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {useUserStore} from '@/stores/auth'
import {computed} from "vue";

const userStore = useUserStore()
const user = computed(() => userStore.user)

const editProfile = () => {
  // Open edit profile dialog
}
</script>

<style scoped>
.profile-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-content {
  display: flex;
}

.avatar-container {
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-info {
  flex: 1;
}

.info-item {
  margin-bottom: 15px;
  font-size: 16px;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #333;
}
</style>
