
import request from '@/utils/request';

// 获取部门列表
export const getDepartmentsApi = () => {
  return request({
    url: '/api/departments',
    method: 'get',
  });
};

// 添加部门
export const addDepartmentApi = (data) => {
  return request({
    url: '/api/departments',
    method: 'post',
    data,
  });
};

// 更新部门
export const updateDepartmentApi = (data) => {
  return request({
    url: `/api/departments/${data.id}`,
    method: 'put',
    data,
  });
};

// 删除部门
export const deleteDepartmentApi = (id) => {
  return request({
    url: `/api/departments/${id}`,
    method: 'delete',
  });
};