/*
 * @Author: chen gongao
 * @LastEditors: chen gongao
 */
import request from "@/utils/iprequest";

export function addCam(data) {
  return request({
    url: "/cam/addCam",
    method: "post",
    data: data
  });
}

export function delCam(data) {
  return request({
    url: "/cam/delCam",
    method: "delete",
    data: data
  });
}

export function kill() {
  return request({
    url: "/rtsp/kill",
    method: "post"
  });
}

export function turnoff() {
  return request({
    url: "/cam/turnOff",
    method: "post"
  });
}

export function connectAll(data) {
  return request({
    url: "/cam/ConnectAll",
    method: "post"
  });
}

export function getAll(data) {
  return request({
    url: "/cam/GetAll",
    method: "post",
    data: data
  });
}
