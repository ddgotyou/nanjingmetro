/*
 * @Author: chen gongao
 * @LastEditors: chen gongao
 */
import request from '@/utils/iprequest'

module.exports={
    getAllIP(){
        return request({
            url: '/ip/selectAll',
            method: 'get'
        })
    },
    addIP(data){
        return request({
            url: '/ip/addIp', 
            method: 'post',
            data: data
        })
    },
    delIP(data){
        return request({
            url: '/ip/delIp',
            method: 'delete',
            data: data
        })
    },
}