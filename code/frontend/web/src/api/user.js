import request from '@/utils/request'

const userRootUri = '/account/users'

/**
 * 登录
 * @param {*} data
 */
export function login(data) {
  const { username, password } = data
  return request({
    url: `/auth/oauth/token?username=${username}&password=${password}&grant_type=password`,
    method: 'post',
    headers: {
      'Authorization': 'Basic Y2xpZW50OmNsaWVudA=='
    }
  })
}

export function getForTenant(tenantId, pageRequest) {
  const uri = userRootUri + '/search/findByTenant?tenant=' + tenantId
  return request({
    url: uri,
    method: 'get'
  })
}

export function createTenantAdmin(user, tenant) {
  const uri = userRootUri + '?tenant=' + tenant
  return request({
    url: uri,
    method: 'post',
    body: user
  })
}

export function update(user) {
  const uri = user._links.self.href
  return request({
    url: uri,
    method: 'put',
    body: user
  })
}

export function create(user) {
  const uri = userRootUri
  return request({
    url: uri,
    method: 'post',
    body: user
  })
}

export function getAll() {
  const uri = userRootUri

  return request({
    url: uri,
    method: 'get'
  })
}
