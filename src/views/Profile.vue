<template>
  <div class="profile-container">
    <el-card class="profile-card" shadow="hover">
      <div class="profile-header">
        <el-avatar :size="120" :src="userInfo.avatar" class="profile-avatar"/>
        <div class="profile-title">
          <h2>{{ userInfo.employeeName }}</h2>
          <p class="position">{{ userInfo.position }}</p>
          <p class="department">{{ userInfo.department }}</p>
        </div>
      </div>

      <el-divider/>

      <el-form label-width="100px" label-position="left" class="profile-form">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.employeeAccount" disabled class="profile-input"/>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="userInfo.employeeName" class="profile-input"/>
        </el-form-item>

        <el-form-item label="部门">
          <el-select v-model="userInfo.department" class="profile-input">
            <el-option label="技术部" value="技术部"/>
            <el-option label="市场部" value="市场部"/>
            <el-option label="人事部" value="人事部"/>
            <el-option label="财务部" value="财务部"/>
          </el-select>
        </el-form-item>

        <el-form-item label="职位">
          <el-input v-model="userInfo.position" class="profile-input"/>
        </el-form-item>

        <el-form-item label="员工ID">
          <el-input v-model="userInfo.employeeId" disabled class="profile-input"/>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="userInfo.gender" class="profile-input">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker
              v-model="userInfo.birthday"
              type="date"
              placeholder="选择日期"
              class="profile-input"
          />
        </el-form-item>

        <el-form-item label="部门ID">
          <el-input v-model="userInfo.departmentId" disabled class="profile-input"/>
        </el-form-item>

        <el-form-item label="工资">
          <el-input v-model="userInfo.salary" class="profile-input"/>
        </el-form-item>

        <el-form-item label="角色">
          <el-input v-model="userInfo.employeeRole" disabled class="profile-input"/>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-input v-model="userInfo.createTime" disabled class="profile-input"/>
        </el-form-item>

        <el-form-item label="更新时间">
          <el-input v-model="userInfo.updateTime" disabled class="profile-input"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveProfile" class="save-btn">
            <el-icon>
              <check/>
            </el-icon>
            <span>保存更改</span>
          </el-button>
          <el-button @click="resetForm" class="reset-btn">
            <el-icon>
              <refresh/>
            </el-icon>
            <span>重置</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {Check, Refresh} from '@element-plus/icons-vue'
import {getEmployeeInfo, updateEmployeeInfo} from '@/api/employee'
import { formatDate, formatDateTime } from '@/utils/date'

let originalUserInfo = {
  employeeAccount: 'admin',
  employeeName: '管理员',
  department: '技术部',
  position: '系统管理员',
  email: 'admin@company.com',
  phone: '13800138000',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  employeeId: 'EMP001',
  gender: '男',
  birthday: '1990-01-01',
  departmentId: 'DEPT001',
  salary: '10000',
  employeeRole: '管理员',
  createTime: '2023-01-01 10:00:00',
  updateTime: '2023-01-01 10:00:00'
}

const userInfo = ref({...originalUserInfo})

// 获取员工信息
const fetchEmployeeInfo = async () => {
  try {
    const response = await getEmployeeInfo()
    if (response.code === 200) {
      // 格式化日期字段
      let birthday = response.data.birthday
      if (birthday && birthday.includes('T')) {
        birthday = formatDate(new Date(birthday))
      }

      userInfo.value = {
        ...userInfo.value,
        employeeName: response.data.employeeName,
        employeeAccount: response.data.employeeAccount,
        department: response.data.department,
        position: response.data.job,
        email: response.data.email,
        phone: response.data.phone,
        employeeId: response.data.employeeId,
        gender: response.data.gender,
        birthday: birthday,
        departmentId: response.data.departmentId,
        salary: response.data.salary.toString(),
        employeeRole: response.data.employeeRole,
        createTime: formatDateTime(new Date(response.data.createTime)),
        updateTime: formatDateTime(new Date(response.data.updateTime))
      }
      // 保存原始数据用于重置
      originalUserInfo.employeeName = response.data.employeeName
      originalUserInfo.employeeAccount = response.data.employeeAccount
      originalUserInfo.department = response.data.department
      originalUserInfo.position = response.data.job
      originalUserInfo.email = response.data.email
      originalUserInfo.phone = response.data.phone
    }
  } catch (error) {
    ElMessage.error('获取个人信息失败')
    console.error(error)
  }
}

// 保存更新后的员工信息
const saveProfile = async () => {
  try {
    // 验证必填字段
    if (!userInfo.value.employeeName.trim()) {
      ElMessage.error('请输入有效的姓名')
      return
    }

    if (!userInfo.value.email.trim() || !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(userInfo.value.email)) {
      ElMessage.error('请输入有效的邮箱')
      return
    }

    if (!userInfo.value.phone.trim() || !/^1[3-9]\d{9}$/.test(userInfo.value.phone)) {
      ElMessage.error('请输入有效的手机号')
      return
    }

    if (userInfo.value.salary && !/^(0|[1-9]\d*)(\.\d+)?$/.test(userInfo.value.salary)) {
      ElMessage.error('请输入有效的工资金额')
      return
    }

    const response = await updateEmployeeInfo(userInfo.value)
    if (response.code === 200) {
      ElMessage.success('个人信息已保存')
      originalUserInfo = {...userInfo.value}
    } else {
      ElMessage.error(response.message || '保存失败')
    }
  } catch (error) {
    ElMessage.error('保存个人信息时发生错误')
    console.error(error)
  }
}

// 页面加载时获取员工信息
onMounted(() => {
  fetchEmployeeInfo()
})
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
  background-color: #409EFF;
  border-color: #409EFF;
}

.reset-btn {
  padding: 10px 24px;
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #606266;
}

/* 新增的响应式调整 */
@media (max-width: 768px) {
  .save-btn, .reset-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>