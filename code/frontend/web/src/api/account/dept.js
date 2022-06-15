import request from '@/utils/request'

// 新增学员
function tree(params) {
  return request({
    url: '/depts/tree',
    method: 'get',
    params: params
  })
}

export { tree }
