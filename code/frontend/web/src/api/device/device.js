import request from '@/utils/request'

module.exports={
  listDevice() {
    return request({
      url: '/device/devices',
      method: 'get'
    })
  },
  search(query){
      return request({
          url: '/device/devices/search/findByConditions',
          method: 'get',
          params: query
      })
  },
  protocols(){
    return request({
        url: '/device/protocols',
        method: 'get'
    })
  },

  deviceTypes(){
      return request({
          url: '/training-plan/planTypes',
          method: 'get'
      })
  },
  add(data){
      return request({
        url: '/devices',
        method: 'post',
        data: data
      })
  },

  planStatuses(){
      return request({
          url: '/training-plan/plans/statuses',
          method: 'get'
      })
  },
  details(id){
      return request({
          url: '/device/devices/'+id,
          method: 'get'
      })
  },

  taskTypes(){
      return request({
          url: '/training-plan/taskTypes',
          method: 'get'
      })
  },
  chooseTasks(){
      return request({
          url: '/training-plan/chooseTasks',
          method: 'get'
      })
  },

  update(data,id){
      return request({
          url: '/device/devices/'+id,
          method: 'put',
          data: data
      })
  }
}
