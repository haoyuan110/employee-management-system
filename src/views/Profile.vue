<template>
  <div class="profile-container">
    <el-card class="profile-card" shadow="hover">
      <div class="profile-header">
        <el-avatar :size="120" :src="userInfo.avatar" class="profile-avatar" />
        <div class="profile-title">
          <h2>{{ userInfo.realName }}</h2>
          <p class="position">{{ userInfo.position }}</p>
          <p class="department">{{ userInfo.department }}</p>
        </div>
      </div>
      
      <el-divider />
      
      <el-form label-width="100px" label-position="left" class="profile-form">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled class="profile-input" />
        </el-form-item>
        
        <el-form-item label="姓名">
          <el-input v-model="userInfo.realName" class="profile-input" />
        </el-form-item>
        
        <el-form-item label="部门">
          <el-select v-model="userInfo.department" class="profile-input">
            <el-option label="技术部" value="技术部" />
            <el-option label="市场部" value="市场部" />
            <el-option label="人事部" value="人事部" />
            <el-option label="财务部" value="财务部" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="职位">
          <el-input v-model="userInfo.position" class="profile-input" />
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" class="profile-input" />
        </el-form-item>
        
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phone" class="profile-input" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="saveProfile" class="save-btn">
            <el-icon><check /></el-icon>
            <span>保存更改</span>
          </el-button>
          <el-button @click="resetForm" class="reset-btn">
            <el-icon><refresh /></el-icon>
            <span>重置</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, Refresh } from '@element-plus/icons-vue'

let originalUserInfo = {
  username: 'admin',
  realName: '管理员',
  department: '技术部',
  position: '系统管理员',
  email: 'admin@company.com',
  phone: '13800138000',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
}

const userInfo = ref({ ...originalUserInfo })

const saveProfile = () => {
  ElMessage.success('个人信息已保存')
  originalUserInfo = { ...userInfo.value }
}

const resetForm = () => {
  userInfo.value = { ...originalUserInfo }
  ElMessage.info('已重置表单')
}
</script>

<style scoped>
.profile-container {
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.profile-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  border: none;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.profile-avatar {
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 30px;
}

.profile-title h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.profile-title .position {
  margin: 8px 0;
  font-size: 16px;
  color: #409EFF;
  font-weight: 500;
}

.profile-title .department {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.profile-form {
  padding: 0 20px;
}

.profile-input {
  width: 100%;
  max-width: 400px;
}

.el-divider {
  margin: 20px 0;
}

.save-btn {
  padding: 10px 24px;
  margin-right: 15px;
}

.reset-btn {
  padding: 10px 24px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-form-item__label {
  color: #606266;
  font-weight: 500;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .profile-input {
    max-width: 100%;
  }
}
</style>