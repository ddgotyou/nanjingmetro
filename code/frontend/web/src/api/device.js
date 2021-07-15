import request from '@/utils/request'

const deviceRootUri = '/entity-mgmt/devices'

export function getDevices(pageRequest) {
  return request({
    url: deviceRootUri,
    method: 'GET'
  })
}

export function createDevice(device) {
  return request({
    url: deviceRootUri,
    method: 'POST',
    data: device
  })
}
