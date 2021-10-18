import request from '@/utils/request'

// 查询学员列表
export function listStudent(query) {
  return request({
    url: '/tms-account/users/getTrainee',
    method: 'get',
    params: query
  })
}

// 查询学员
export function studentInfo(stuId, query) {
  return request({
    url: '/tms-account/users/getTraineeById/' + stuId,
    method: 'get',
    params: query
  })
}

// 新增学员
export function addStudent(data) {
  return request({
    url: '/tms-account/users/addTrainee',
    method: 'post',
    data: data
  })
}

// 删除学员
export function delStudent(stuId) {
  return request({
    url: '/tms-account/users/deleteTrainee/' + stuId,
    method: 'delete'
  })
}

// 编辑学员
export function editStudent(stuId, data) {
  return request({
    url: '/tms-account/users/editTrainee/' + stuId,
    method: 'put',
    data: data
  })
}

// 模糊搜索学员
export function searchStudent(keyword) {
  return request({
    url: '/tms-account/users/getTraineeLike/' + keyword,
    method: 'get',
  })
}