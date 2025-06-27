import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  // 员工管理
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('@/views/employee/EmployeeView.vue'),
    meta: { requiresAuth: true, roles: ['admin', 'manager'] }
  },
  {
    path: '/employee/add',
    name: 'AddEmployee',
    component: () => import('@/views/employee/AddEmployeeView.vue'),
    meta: { requiresAuth: true, roles: ['admin', 'manager'] }
  },
  {
    path: '/employee/roles',
    name: 'RoleManage',
    component: () => import('@/views/employee/RoleManageView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  // 加班管理
  {
    path: '/overtime',
    name: 'Overtime',
    component: () => import('@/views/overtime/OvertimeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/overtime/apply',
    name: 'OvertimeApply',
    component: () => import('@/views/overtime/OvertimeApplyView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/overtime/approve',
    name: 'OvertimeApprove',
    component: () => import('@/views/overtime/OvertimeApproveView.vue'),
    meta: { requiresAuth: true, roles: ['admin', 'manager'] }
  },
  // 统计管理
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/StatisticsView.vue'),
    meta: { requiresAuth: true, roles: ['admin', 'manager'] }
  },
  // 请假管理
  {
    path: '/leave',
    name: 'Leave',
    component: () => import('@/views/leave/LeaveView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/leave/apply',
    name: 'LeaveApply',
    component: () => import('@/views/leave/LeaveApplyView.vue'),
    meta: { requiresAuth: true }
  },
  // 出差管理
  {
    path: '/business',
    name: 'Business',
    component: () => import('@/views/business/BusinessView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/business/apply',
    name: 'BusinessApply',
    component: () => import('@/views/business/BusinessApplyView.vue'),
    meta: { requiresAuth: true }
  },
  // 公告管理
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/notice/NoticeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notice/detail/:id',
    name: 'NoticeDetail',
    component: () => import('@/views/notice/NoticeDetailView.vue'),
    meta: { requiresAuth: true }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useUserStore()

  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // 检查角色权限
  if (to.meta.roles && !authStore.hasAnyRole(to.meta.roles)) {
    next('/')
    return
  }

  next()
})

export default router
