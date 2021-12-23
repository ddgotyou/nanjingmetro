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
function getDepts() {
    return request({
        url: '/tms-account/depts/getDepts',
        method: 'get'
    })
}
function getAuditor(uid,deptid) {
    return request({
        url: '/tms-account/users/getAuditorList/'+uid+'/'+deptid,
        method: 'get'
    })
}

export{
    getTrainee,getDepts,getAuditor
}