import request from '@/utils/request'

export function getDeviceList() {
  return request({
    url: '/app/device/list',
    method: 'post',
	data: {}
  })
}

export function addDevice(data) {
  return request({
    url: '/app/device/add',
    method: 'post',
    data: data
  })
}

export function editDevice(data) {
  return request({
    url: '/app/device/edit',
    method: 'post',
    data: data
  })
}

export function addStore(data) {
  data.operation = 1
  return request({
    url: '/app/device/store',
    method: 'post',
    data: data
  })
}

export function subStore(data) {
  data.operation = -1
  return request({
    url: '/app/device/store',
    method: 'post',
    data: data
  })
}

export function deviceDetail(data) {
  return request({
    url: '/app/device/detail?id=' + data,
    method: 'post'
  })
}

export function getRecordList(data) {
  return request({
    url: '/app/device/storeRecord',
    method: 'post',
	data: data
  })
}
