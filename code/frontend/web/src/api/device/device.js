import request from '@/utils/request'

export function listDevice() {
  return request({
    url: '/device/devices',
    method: 'get'
    //params: query
  })
}
