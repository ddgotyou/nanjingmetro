import request from '@/utils/request'

// 查询学员列表
export function listTeacher(query) {
  return request({
    url: '/tms-account/users/getTrainer',
    method: 'get',
    params: query
  })
}

// 查询学员
export function teacherInfo(stuId, query) {
  return request({
    url: '/tms-account/users/getTrainerById/' + stuId,
    method: 'get',
    params: query
  })
}

// 新增学员
export function addTeacher(data) {
  return request({
    url: '/tms-account/users/addTrainer',
    method: 'post',
    data: data
  })
}

// 删除学员
export function delTeacher(stuId) {
  return request({
    url: '/tms-account/users/deleteTrainer/' + stuId,
    method: 'delete'
  })
}

// 编辑学员
export function editTeacher(stuId, data) {
  return request({
    url: '/tms-account/users/editTrainer/' + stuId,
    method: 'put',
    data: data
  })
}

// 模糊搜索学员
export function searchTeacher(keyword) {
  return request({
    url: '/tms-account/users/getTrainerLike/' + keyword,
    method: 'get',
  })
}