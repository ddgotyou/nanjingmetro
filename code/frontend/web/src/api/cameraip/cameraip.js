/*
 * @Author: chen gongao
 * @LastEditors: chen gongao
 */
import request from "@/utils/iprequest";

export function addCam(data) {
  return request({
    url: "/monitor/cam/addCam",
    method: "post",
    data: data
  });
}

export function delCam(data) {
  return request({
    url: "/monitor/cam/delCam",
    method: "delete",
    data: data
  });
}

export function kill() {
  return request({
    url: "/monitor/rtsp/kill",
    method: "post"
  });
}

export function newSession() {
  return request({
    url: "/monitor/rtsp/newSession",
    method: "post"
  });
}

export function turnoff() {
  return request({
    url: "/monitor/cam/turnOff",
    method: "post"
  });
}

export function connectAll(data) {
  return request({
    url: "/monitor/cam/ConnectAll",
    method: "post"
  });
}

export function getAll(data) {
  return request({
    url: "/monitor/cam/GetAll",
    method: "post",
    data: data
  });
}
