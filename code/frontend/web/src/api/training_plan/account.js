/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

function getTrainee() {
    return request({
        url: '/tms-account/users/getAllTraineeInPlan',
        method: 'get'
    })
}
function getTraineeGroup() {
    return request({
        url: '/tms-account/usergroup/getAllUsergroupInPlan',
        method: 'get'
    })
}
function getDepts() {
    return request({
        url: '/tms-account/depts/getDepts',
        method: 'get'
    })
}
function getAuditor(deptid) {
    return request({
        url: '/tms-account/users/getAuditorList/'+deptid,
        method: 'get'
    })
}

export{
    getTrainee,getTraineeGroup,getDepts,getAuditor
}