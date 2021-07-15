import request from '@/utils/request'

const customerRootUri = '/account/customers'

export function getCustomersForTenant(tenant, pageRequest) {
  return request({
    url: customerRootUri + '/search/findByTenant/?tenant=' + tenant + '&sort=createdDate,desc',
    method: 'GET'
  })
}

export function createCustomer(customer) {
  return request({
    url: customerRootUri,
    method: 'POST',
    data: customer
  })
}

export function findCustomersByTenantAndName(tenant, name) {
  return request({
    url: customerRootUri + '/search/findByTenantAndNameContains/?tenant=' + tenant + '&name=' + name,
    method: 'GET'
  })
}
