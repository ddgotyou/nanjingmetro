/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

//获取某计划各个任务的学员信息
//planId
function list_students(query) {
    return request({
        url: '/training-plan/scores/planSummary',
        method: 'get',
        params: query
    })
}

//搜索计划学员信息
//userId, planId, scoringStatus, username
function search_list(query) {
    return request({
        url: '/training-plan/scores/planSummary',
        method: 'get',
        params: query
    })
}

//上传打分表模板
//  name
//  details[
//      {
//          content
//          point
//          totalScore
//      }
//  ]
function upload_template(data) {
    return request({
        url: '/training-plan/scoringFormTemplates',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        data: data
    })
}
//更新打分表模板
//  name
//  details[
//      {
//          content
//          point
//          totalScore
//      }
//  ]
function update_template(id,data) {
    return request({
        url: '/training-plan/scoringFormTemplates/'+id,
        method: 'put',
        headers:{
            "Content-Type":"application/json",
        },
        data: data
    })
}

//获取打分表模板细节
//id（打分表的id）
function get_template(id) {
    return request({
        url: '/training-plan/scoringFormTemplates/'+id,
        method: 'get',
    })
}

//删除打分表模板
//id（打分表的id）
function del_template(id) {
    return request({
        url: '/training-plan/scoringFormTemplates/'+id,
        method: 'delete',
    })
}

//获取可用的打分表模板下拉框列表
//无
function list_template(query) {
    return request({
        url: '/training-plan/scoringFormTemplates',
        method: 'get',
    })
}

//获取学员详细成绩信息
//userId, planId, taskOrder
function get_details(query) {
    return request({
        url: '/training-plan/scores/traineeDetails',
        method: 'get',
        params: query
    })
}

//上传学员成绩
//userId, scoringItemId, score
function upload_score(query) {
    return request({
        url: '/training-plan/scores',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        params: query
    })
}

function fromTemplate_batch(data) {
    return request({
        url: '/training-plan/scoringItems/fromTemplate/batch',
        method: 'post',
        data: data
    })
}

function findScoringItems(params) {
    return request({
        url: '/training-plan/scoringItems/search/findByPlanAndTaskOrder',
        method: 'get',
        params: params
    })
}
function addScoringItems(data) {
    return request({
        url: '/training-plan/scoringItems',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        data: data
    })
}
function delScoringItems(id) {
    return request({
        url: '/training-plan/scoringItems/'+id,
        method: 'delete'
    })
}

export{
    list_students,
    search_list,
    update_template,
    upload_template,
    get_template,
    del_template,
    list_template,
    get_details,
    upload_score,
    fromTemplate_batch,
    findScoringItems,
    addScoringItems,
    delScoringItems
}