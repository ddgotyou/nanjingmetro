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

// 查询所有用户列表
export function listUser(query) {
  return request({
    url: '/tms-account/usergroup/getAllUser',
    method: 'get',
    params: query
  })
}

// 删除学员
export function deleteUserGroup(id) {
  return request({
    url: '/system/dept/' + id,
    method: 'delete'
  })
}

// 模糊搜索用户
export function searchUser(keyword) {
  return request({
    url: '/tms-account/usergroup/getUserLike/' + keyword,
    method: 'get',
  })
}