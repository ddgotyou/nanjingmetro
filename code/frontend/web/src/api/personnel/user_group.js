import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/common";

// 查询用户组列表
export function listUserGroup(query) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}
