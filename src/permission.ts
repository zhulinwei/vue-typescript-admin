import router from './router'
import { Route } from 'vue-router'

import { UserModule } from './store/modules/user'

const whiteList = ['/login']

router.beforeEach(async(to: Route, _: Route, next: any) => {
  const userToken = UserModule.token
  if (!userToken) {
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`)
    return
  }

  let userRoles = UserModule.roles
  if (!userRoles || userRoles.length < 1) {
    await UserModule.GetUserInfo()
    userRoles = UserModule.roles
  }
  // TODO 检查用户角色是否有访问页面的权限
  next()
})