import request from '@/utils/request'

// 用户培训计划
export function plan(id, page, size) {
  return request({
    url: '/training-plan/plans/search/findUserPlans' + '?userId=' + id + "&page=" + page + "&size=" + size,
    method: 'get',
  })
}

// 用户本周任务
export function task(id) {
  return request({
    url: '/training-plan/plans/search/findUserWeeklyTasks' + '?userId=' + id,
    method: 'get',
  })
}

// 用户本周任务
export function apply(id) {
  return request({
    url: '/training-plan/applications/search/findByAuditor' + '?userId=' + id,
    method: 'get',
  })
}