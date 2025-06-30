import request from '@/utils/request'

/**
 * 获取当前登录员工信息
 * @returns {Promise} 包含员工信息的Promise对象
 */
export function getEmployeeInfo() {
  return request({
    url: '/employee/info',
    method: 'get'
  })
}

/**
 * 更新员工信息
 * @param {Object} data 要更新的员工数据
 * @param {string} data.employeeName 员工姓名
 * @param {string} data.department 部门
 * @param {string} data.position 职位
 * @param {string} data.email 邮箱
 * @param {string} data.phone 手机号
 * @param {string} data.gender 性别
 * @param {string} data.birthday 生日
 * @param {string} data.salary 工资
 * @returns {Promise} 包含操作结果的Promise对象
 */
export function updateEmployeeInfo(data) {
  return request({
    url: '/employee/update',
    method: 'post',
    data: {
      employeeName: data.employeeName,
      department: data.department,
      job: data.position,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      birthday: data.birthday,
      salary: data.salary
    }
  })
}