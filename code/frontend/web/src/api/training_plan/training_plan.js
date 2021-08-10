import request from '@/utils/request'

module.exports={
    plans(data){
        return request({
            url: '/training-plan/plans',
            method: 'get'
        })
    }
}