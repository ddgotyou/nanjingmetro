/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

function plans(query){
    return request({
        url: '/training-plan/plans',
        method: 'get',
        params: query
    })
}
function search(query){
    return request({
        url: '/training-plan/plans/search/findByConditions',
        method: 'get',
        params: query
    })
}
function planStatuses(){
    return request({
        url: '/training-plan/plans/statuses',
        method: 'get'
    })
}
function details(id){
    return request({
        url: '/training-plan/plans/'+id,
        method: 'get'
    })
}
function planTypes(){
    return request({
        url: '/training-plan/planTypes',
        method: 'get'
    })
}
function taskTypes(){
    return request({
        url: '/training-plan/taskTypes',
        method: 'get'
    })
}
function chooseTasks(){
    return request({
        url: '/training-plan/chooseTasks',
        method: 'get'
    })
}
function classrooms(){
    return request({
        url: '/training-plan/classrooms',
        method: 'get'
    })
}
function add(data){
    return request({
        url: '/training-plan/plans',
        method: 'post',
        data: data
    })
}
function del(id){
    return request({
        url: '/training-plan/plans/'+id,
        method: 'delete'
    })
}
function update(data,id){
    return request({
        url: '/training-plan/plans/'+id,
        method: 'put',
        data: data
    })
}
function findClassrooms(query){
    return request({
        url: '/training-plan/classrooms/search/findAvailableClassrooms',
        method: 'get',
        params: query
    })
}
function findAvailableTime(query){
    return request({
        url: '/training-plan/classrooms/search/findAvailableTime',
        method: 'get',
        params: query
    })
}

export{
    plans,search,planStatuses,details,planTypes,taskTypes,chooseTasks,classrooms,add,del,update,findClassrooms,findAvailableTime
}