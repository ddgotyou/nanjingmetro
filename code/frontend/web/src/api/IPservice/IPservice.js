/*
 * @Author: chen gongao
 * @LastEditors: chen gongao
 */
import request from "@/utils/iprequest";

export function getAllIP() {
  return request({
    url: "/monitor/ip/selectAll",
    method: "get"
  });
}

export function addIP(data) {
  return request({
    url: "/monitor/ip/addIp",
    method: "post",
    data: data
  });
}

export function delIP(data) {
  return request({
    url: "/monitor/ip/delIp",
    method: "delete",
    data: data
  });
}
