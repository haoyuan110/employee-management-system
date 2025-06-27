<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-header">
          <h2>员工管理系统</h2>
          <p>欢迎登录</p>
        </div>
      </template>
      <el-form
          ref="loginForm"
          :model="formData"
          :rules="rules"
          label-width="80px"
          label-position="top"
      >
        <el-form-item label="工号" prop="employeeId">
          <el-input
              v-model.number="formData.employeeId"
              placeholder="请输入员工工号"
          />
        </el-form-item>
        <el-form-item label="账号" prop="employeeAccount">
          <el-input
              v-model="formData.employeeAccount"
              placeholder="请输入账号"
              prefix-icon="user"
          />
        </el-form-item>
        <el-form-item label="密码" prop="employeePassword">
          <el-input
              v-model="formData.employeePassword"
              type="password"
              placeholder="请输入密码"
              prefix-icon="lock"
              show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              style="width: 100%"
              :loading="loading"
              @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref(null)
const loading = ref(false)

const formData = ref({
  employeeId: null,
  employeeAccount: '',
  employeePassword: ''
})

const rules = {
  employeeId: [
    { required: true, message: '请输入员工工号', trigger: 'blur' },
    { type: 'number', min: 1, message: '工号必须大于0', trigger: 'blur' }
  ],
  employeeAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  employeePassword: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 开发环境自动填充测试账号
// const fillTestCredentials = () => {
//   if (import.meta.env.DEV) {
//     formData.value = {
//       employeeId: 1,
//       employeeAccount: 'admin',
//       employeePassword: '123456'
//     }
//     console.log('已自动填充测试账号')
//   }
// }

const handleLogin = async () => {
  try {
    await loginForm.value.validate()
    loading.value = true
    const result = await userStore.login(formData.value)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名或密码')
  } finally {
    loading.value = false
  }
}

// onMounted(() => {
//   fillTestCredentials()
// })
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2d3a4b;
}

.login-card {
  width: 400px;
  border-radius: 6px;
}

.login-header {
  text-align: center;
}

.login-header h2 {
  margin: 0;
  color: #333;
}

.login-header p {
  margin: 10px 0 0;
  color: #666;
}
</style>
