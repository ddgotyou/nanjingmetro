/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

function submit(data) {
    return request({
        url: '/training-plan/applications',
        method: 'post',
        data: data
    })
}
function findByAuditor(query){
    return request({
        url: '/training-plan/applications/search/findByAuditor',
        method: 'get',
        params: query
    })
}
function findByAdmin(query){
    return request({
        url: '/training-plan/applications/search/findByAdmin',
        method: 'get',
        params: query
    })
}
// 这些接口弃用
// function list(query) {
//     return request({
//         url: '/training-plan/applications',
//         method: 'get',
//         params: query
//     })
// }
// function search(query){
//     return request({
//         url: '/training-plan/applications/search/findOnAuditByConditions',
//         method: 'get',
//         params: query
//     })
// }
function approve(id,data) {
    return request({
        url: '/training-plan/applications/'+id+'/approve',
        method: 'post',
        data: data
    })
}
function reject(id,data) {
    return request({
        url: '/training-plan/applications/'+id+'/reject',
        method: 'post',
        data: data
    })
}

export{
    submit,
    findByAuditor,
    findByAdmin,
    approve,
    reject
}