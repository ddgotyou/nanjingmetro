/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

// 用户培训计划
// export function plan(id) {
//   return request({
//     url: '/training-plan/plans/search/findUserPlans' + '?userId=' + id,
//     method: 'get',
//   })
// }
export function plan(userId){
  return request({
      url: '/training-plan/plans',
      headers: {
          user_id: userId
      },
      method: 'get',
      params: {
        module: 'plan_query',
        trainer: userId,
        page: 0,
        size: 20
      }
  })
}

// 用户本周任务
export function task(id) {
  return request({
    url: '/training-plan/tasks/weekly' + '?userId=' + id,
    method: 'get',
  })
}

// 用户待审核申请
export function apply(id, status, page, size) {
  return request({
    url: '/training-plan/applications/search/findByAuditor' + '?userId=' + id + "&page=" + page + "&size=" + size + "&status=" + status,
    method: 'get',
  })
}