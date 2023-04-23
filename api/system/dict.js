import request from '@/utils/request'

export function getDictList(type) {
  return request({
    url: '/app/dict/list',
    method: 'post',
	data: {
		dictType: type
	}
  })
}
