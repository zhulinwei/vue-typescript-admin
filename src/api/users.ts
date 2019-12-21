import * as mockData from '@/mock'
import request from '@/utils/request'

function sleep (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const mockUserResponse = {
 "code": 200,
 "data": {
 	"user": {
 		"id": 0,
 		"username": "admin",
 		"password": "any",
 		"name": "Super Admin",
 		"avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 		"introduction": "I am a super administrator",
 		"email": "admin@test.com",
 		"phone": "1234567890",
 		"roles": ["admin"]
 	}
  }
}

export const getUserInfo = (data: any) => {
  return request({
    url: '/users/info',
    method: 'post',
    data
  })
}

export const login = async (data: any) => {
  await sleep(1000)
  return mockData.loginResponse
}

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })
