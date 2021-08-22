import request from '@/utils/request'

module.exports={
    plans(query){
        return request({
            url: '/training-plan/plans',
            method: 'get',
            params: query
        })
    },
    search(query){
        return request({
            url: '/training-plan/plans/search/findByConditions',
            method: 'get',
            params: query
        })
    },
    details(id){
        return request({
            url: '/training-plan/plans/'+id,
            method: 'get'
        })
    }
}