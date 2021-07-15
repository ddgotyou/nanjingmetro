import request from '@/utils/request'

const tenantRootUri = '/account/tenants'

export function getAll(pageRequest) {
  return request({
    url: tenantRootUri + '?sort=createdDate,desc',
    method: 'GET'
  })
}

export function createTenant(tenant) {
  return request({
    url: tenantRootUri,
    method: 'POST',
    data: tenant
  })
}
