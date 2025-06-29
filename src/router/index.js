import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/auth";

// 引入页面组件并命名别名
import LoginView from "@/views/LoginView.vue";
import BasicView from "@/views/BasicView.vue"; // 已经引入
import HomeView from "@/views/HomeView.vue";

// 员工模块
import EmployeeView from "@/views/employee/EmployeeView.vue";
import AddEmployeeView from "@/views/employee/AddEmployeeView.vue";
import RoleManageView from "@/views/employee/RoleManageView.vue";

// 加班模块
import OvertimeView from "@/views/overtime/OvertimeView.vue";
import OvertimeApplyView from "@/views/overtime/OvertimeApplyView.vue";
import OvertimeApproveView from "@/views/overtime/OvertimeApproveView.vue";

// 统计模块
import StatisticsView from "@/views/statistics/StatisticsView.vue";

// 请假模块
import LeaveView from "@/views/leave/LeaveView.vue";
import LeaveApplyView from "@/views/leave/LeaveApplyView.vue";

// 出差模块
import BusinessView from "@/views/business/BusinessView.vue";
import BusinessApplyView from "@/views/business/BusinessApplyView.vue";

// 公告模块
import NoticeView from "@/views/notice/NoticeView.vue";
import NoticeDetailView from "@/views/notice/NoticeDetailView.vue";

// 404 页面
import NotFoundView from "@/views/NotFoundView.vue";

// 添加测试输出：检查组件是否被正确引入
// console.log('LoginView:', LoginView)
// console.log('BasicView:', BasicView)
// console.log('HomeView:', HomeView)
// console.log('EmployeeView:', EmployeeView)
// console.log('AddEmployeeView:', AddEmployeeView)
// console.log('OvertimeView:', OvertimeView)
// console.log('StatisticsView:', StatisticsView)
// console.log('LeaveView:', LeaveView)
// console.log('BusinessView:', BusinessView)
// console.log('NoticeView:', NoticeView)
// console.log('NotFoundView:', NotFoundView)

const routes = [
  {
    path: "/employee/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    component: BasicView,
    meta: { requiresAuth: true },
    children: [
      { path: "home", name: "Home", component: HomeView },
      {
        path: "employee",
        name: "Employee",
        component: EmployeeView,
        meta: { roles: ["admin", "manager"] },
      },
      {
        path: "employee/add",
        name: "AddEmployee",
        component: AddEmployeeView,
        meta: { roles: ["admin", "manager"] },
      },
      {
        path: "employee/roles",
        name: "RoleManage",
        component: RoleManageView,
        meta: { roles: ["admin"] },
      },
      { path: "overtime", name: "Overtime", component: OvertimeView },
      {
        path: "overtime/apply",
        name: "OvertimeApply",
        component: OvertimeApplyView,
      },
      {
        path: "overtime/approve",
        name: "OvertimeApprove",
        component: OvertimeApproveView,
        meta: { roles: ["admin", "manager"] },
      },
      {
        path: "statistics",
        name: "Statistics",
        component: StatisticsView,
        meta: { roles: ["admin", "manager"] },
      },
      { path: "leave", name: "Leave", component: LeaveView },
      { path: "leave/apply", name: "LeaveApply", component: LeaveApplyView },
      { path: "business", name: "Business", component: BusinessView },
      {
        path: "business/apply",
        name: "BusinessApply",
        component: BusinessApplyView,
      },
      { path: "notice", name: "Notice", component: NoticeView },
      {
        path: "notice/detail/:id",
        name: "NoticeDetail",
        component: NoticeDetailView,
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"), // 假设你有一个Profile.vue组件
    meta: { requiresAuth: true }, // 如果需要登录才能访问
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useUserStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/employee/login");
    return;
  }

  if (to.meta.roles && !authStore.hasAnyRole(to.meta.roles)) {
    next("/");
    return;
  }

  next();
});

export default router;
