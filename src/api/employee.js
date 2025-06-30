// 员工相关API
import { get, post } from '@/utils/api'

/**
 * 获取当前员工信息
 * @returns {Promise}
 */
export function getEmployeeInfo() {
  return get('/api/employee/current')
}

/**
 * 更新员工信息
 * @param {object} employeeData
 * @returns {Promise}
 */
export function updateEmployeeInfo(employeeData) {
  return post('/api/employee/update', employeeData)
}