import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/login',
    headers: {
      'isToken': false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/app/user/getUserInfo',
    method: 'get'
  })
}

// 获取用户详细信息
export function getDict() {
  return request({
    url: '/app/dict/tree',
    method: 'get'
  })
}

// 登录方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
