import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/common";

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}
