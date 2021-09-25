import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/common";

// 查询讲师列表
export function listTeacher(query) {
  return request({
    url: '/tms-account/users/getLecturer',
    method: 'get',
    params: query
  })
}
