import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/common";

// 查询学员列表
export function listStudent(query) {
  return request({
    url: '/tms-account/users/getStudent/',
    method: 'get',
    params: query
  })
}
