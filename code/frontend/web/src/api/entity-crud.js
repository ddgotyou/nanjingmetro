import request from '@/utils/request'

/**
 * 根据Hateoas链接与RESTful规则创建实体
 * @param {*} entity
 */
export function createEntity(entity, url) {
  return request({
    url: url,
    method: 'POST',
    data: entity
  })
}

export function updateEntity(entity) {
  const url = entity._links.self.href

  return request({
    url: url,
    method: 'PUT',
    data: entity
  })
}

export function deleteEntity(entity) {
  const url = entity._links.self.href

  return request({
    url: url,
    method: 'DELETE'
  })
}
