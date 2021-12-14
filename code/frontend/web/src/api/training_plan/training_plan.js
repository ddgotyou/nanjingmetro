/*
 * @Author: your name
 * @LastEditors: your name
 */
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
    planStatuses(){
        return request({
            url: '/training-plan/plans/statuses',
            method: 'get'
        })
    },
    details(id){
        return request({
            url: '/training-plan/plans/'+id,
            method: 'get'
        })
    },
    planTypes(){
        return request({
            url: '/training-plan/planTypes',
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
    classrooms(){
        return request({
            url: '/training-plan/classrooms',
            method: 'get'
        })
    },
    add(data){
        return request({
            url: '/training-plan/plans',
            method: 'post',
            data: data
        })
    },
    del(id){
        return request({
            url: '/training-plan/plans/'+id,
            method: 'delete'
        })
    },
    update(data,id){
        return request({
            url: '/training-plan/plans/'+id,
            method: 'put',
            data: data
        })
    },
    findClassrooms(query){
        return request({
            url: '/training-plan/classrooms/search/findAvailableClassrooms',
            method: 'get',
            params: query
        })
    },
    findAvailableTime(query){
        return request({
            url: '/training-plan/classrooms/search/findAvailableTime',
            method: 'get',
            params: query
        })
    }
}