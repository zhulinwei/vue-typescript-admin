import * as mockData from '@/mock'
import request from '@/utils/request'

function sleep (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getUserInfo = (data: any) => {
  return mockData.userInfoResponse
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
