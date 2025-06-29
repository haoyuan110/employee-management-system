<template>
  <div class="department-management">
    <div class="header">
      <h2>部门管理</h2>
      <el-button type="primary" @click="showAddDialog">添加部门</el-button>
    </div>

    <el-table :data="departments" border style="width: 100%">
      <el-table-column prop="id" label="部门ID" width="120" />
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="managerName" label="部门经理" />
      <el-table-column prop="employeeCount" label="员工数量" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑部门对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑部门' : '添加部门'"
      width="500px"
    >
      <el-form :model="form" label-width="100px" ref="formRef">
        <el-form-item
          label="部门名称"
          prop="name"
          :rules="[{ required: true, message: '请输入部门名称' }]"
        >
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门经理" prop="managerId">
          <el-select
            v-model="form.managerId"
            placeholder="请选择部门经理"
            clearable
          >
            <el-option
              v-for="employee in employees"
              :key="employee.id"
              :label="employee.employeeName"
              :value="employee.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入部门描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useEmployeeStore } from "@/stores/employee";
import { useDepartmentStore } from "@/stores/department";

const employeeStore = useEmployeeStore();
const departmentStore = useDepartmentStore();

// 部门列表
const departments = ref([]);
// 员工列表（用于选择部门经理）
const employees = ref([]);
// 对话框显示状态
const dialogVisible = ref(false);
// 是否为编辑模式
const isEdit = ref(false);
// 表单引用
const formRef = ref(null);

// 表单数据
const form = ref({
  id: null,
  name: "",
  managerId: null,
  description: "",
});

// 加载部门数据
const loadDepartments = async () => {
  try {
    await departmentStore.fetchDepartments();
    departments.value = departmentStore.departments.map((dept) => ({
      ...dept,
      employeeCount: dept.employees ? dept.employees.length : 0,
      managerName: dept.manager ? dept.manager.employeeName : "未设置",
    }));
  } catch (error) {
    ElMessage.error("加载部门数据失败: " + error.message);
  }
};

// 加载员工数据
const loadEmployees = async () => {
  try {
    await employeeStore.fetchEmployees();
    employees.value = employeeStore.employees;
  } catch (error) {
    ElMessage.error("加载员工数据失败: " + error.message);
  }
};

// 显示添加对话框
const showAddDialog = () => {
  isEdit.value = false;
  form.value = {
    id: null,
    name: "",
    managerId: null,
    description: "",
  };
  dialogVisible.value = true;
};

// 处理编辑
const handleEdit = (row) => {
  isEdit.value = true;
  form.value = {
    id: row.id,
    name: row.name,
    managerId: row.managerId,
    description: row.description,
  };
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除部门 "${row.name}" 吗?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await departmentStore.deleteDepartment(row.id);
        ElMessage.success("删除成功");
        loadDepartments();
      } catch (error) {
        ElMessage.error("删除失败: " + error.message);
      }
    })
    .catch(() => {});
};

// 提交表单
const submitForm = async () => {
  try {
    await formRef.value.validate();
    
    if (isEdit.value) {
      await departmentStore.updateDepartment(form.value);
      ElMessage.success("更新部门成功");
    } else {
      await departmentStore.addDepartment(form.value);
      ElMessage.success("添加部门成功");
    }
    
    dialogVisible.value = false;
    loadDepartments();
  } catch (error) {
    if (error.message) {
      ElMessage.error(error.message);
    }
  }
};

// 初始化加载数据
onMounted(() => {
  loadDepartments();
  loadEmployees();
});
</script>

<style scoped>
.department-management {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>