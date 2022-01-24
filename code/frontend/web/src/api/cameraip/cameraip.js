/*
 * @Author: your name
 * @LastEditors: your name
 */
import request from '@/utils/iprequest'

module.exports={
    addCam(data){
        return request({
            url: '/cam/addCam',
            method: 'post',
            data: data
        })
    },
    delCam(data){
        return request({
            url: '/cam/delCam',
            method: 'delete',
            data: data, 
        })
    },
    kill(){
        return request({
            url: '/rtsp/kill',
            method: 'post',
        })
    },
    turnoff(){
        return request({
            url: '/cam/turnOff',
            method: 'post',
        })
    },
    connectAll(data){
        return request({
            url: '/cam/ConnectAll',
            method: 'post',
        })
    },
    getAll(data){
        return request({
            url: '/cam/GetAll',
            method: 'post',
            data: data,
        })
    },
}