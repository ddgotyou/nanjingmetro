/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

module.exports={
    getTrainee() {
        return request({
            url: '/tms-account/users/getAllTraineeInPlan',
            method: 'get'
        })
    },
    getDepts() {
        return request({
            url: '/tms-account/depts/getDepts',
            method: 'get'
        })
    },
    getAuditor(uid,deptid) {
        return request({
            url: '/tms-account/users/getAuditorList/'+uid+'/'+deptid,
            method: 'get'
        })
    }
}