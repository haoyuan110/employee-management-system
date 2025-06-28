<script setup lang="ts">
import {Location,} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>企业内部管理系统</el-header>
      <el-container>
        <el-aside width="500px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu
                  active-text-color="#ffd04b"
                  background-color="#545c64"
                  class="el-menu-vertical-demo"
                  default-active="2"
                  text-color="#fff"
                  @open="handleOpen"
                  @close="handleClose"
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>主页</span>
                  </template>
                  <el-menu-item index="1-1">查看个人信息</el-menu-item>
                  <el-menu-item index="1-2">修改个人信息</el-menu-item>
                  <el-menu-item index="1-3">进行自我考勤</el-menu-item>
                  <el-menu-item index="1-4">查看考勤记录</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>员工管理</span>
                  </template>
                  <router-link :to="{ path: '/employee' }" style="text-decoration: none;">
                    <el-menu-item index="2-1">员工基本信息</el-menu-item>
                  </router-link>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>部门管理</span>
                  </template>
                  <el-menu-item index="3-1">部门基本信息</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>请假管理</span>
                  </template>
                  <el-menu-item index="4-1">请假申请</el-menu-item>
                  <el-menu-item index="4-2">请假记录</el-menu-item>
                  <el-menu-item index="4-3">请假审批</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="5">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>加班管理</span>
                  </template>
                  <el-menu-item index="5-1">加班申请</el-menu-item>
                  <el-menu-item index="5-2">加班记录</el-menu-item>
                  <el-menu-item index="5-3">加班审批</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="6">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>出差管理</span>
                  </template>
                  <el-menu-item index="6-1">出差申请</el-menu-item>
                  <el-menu-item index="6-2">出差记录</el-menu-item>
                  <el-menu-item index="6-3">出差审批</el-menu-item>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>


