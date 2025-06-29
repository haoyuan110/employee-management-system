import { defineStore } from 'pinia';
import { ref } from 'vue';
import { addDepartmentApi, deleteDepartmentApi, getDepartmentsApi, updateDepartmentApi } from '@/utils/department';

export const useDepartmentStore = defineStore('department', () => {
  const departments = ref([]);

  // 获取部门列表
  const fetchDepartments = async () => {
    try {
      const response = await getDepartmentsApi();
      departments.value = response.data;
    } catch (error) {
      throw error;
    }
  };

  // 添加部门
  const addDepartment = async (departmentData) => {
    try {
      await addDepartmentApi(departmentData);
      await fetchDepartments();
    } catch (error) {
      throw error;
    }
  };

  // 更新部门
  const updateDepartment = async (departmentData) => {
    try {
      await updateDepartmentApi(departmentData);
      await fetchDepartments();
    } catch (error) {
      throw error;
    }
  };

  // 删除部门
  const deleteDepartment = async (id) => {
    try {
      await deleteDepartmentApi(id);
      await fetchDepartments();
    } catch (error) {
      throw error;
    }
  };

  return {
    departments,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  };
});