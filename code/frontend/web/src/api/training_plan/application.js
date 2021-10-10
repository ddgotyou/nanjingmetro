/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/request'

module.exports={
    submit(data){
        return request({
            url: '/training-plan/applications',
            method: 'post',
            data: data
        })
    }
}