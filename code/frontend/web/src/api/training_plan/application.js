/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

module.exports={
    submit(data) {
        return request({
            url: '/training-plan/applications',
            method: 'post',
            data: data
        })
    },
    list(query) {
        return request({
            url: '/training-plan/applications',
            method: 'get',
            params: query
        })
    },
    search(query){
        return request({
            url: '/training-plan/applications/search/findByConditions',
            method: 'get',
            params: query
        })
    },
    approve(id,data) {
        return request({
            url: '/training-plan/applications/'+id+'/approve',
            method: 'post',
            data: data
        })
    },
    reject(id,data) {
        return request({
            url: '/training-plan/applications/'+id+'/reject',
            method: 'post',
            data: data
        })
    }
}