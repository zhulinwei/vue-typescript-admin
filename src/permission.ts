import router from './router'
import { Route } from 'vue-router'
import { Message } from 'element-ui'

import { UserModule } from './store/modules/user'
import { PermissionModule } from './store/modules/permission'
// import { PermissionModule } from '@/store/modules/permission'

const whiteList = ['/login']

router.beforeEach(async(to: Route, _: Route, next: any) => {

  // 判断是否需要验证
  if (!to.meta.requiresAuth) {
    return next()
  }

  const userRoles = UserModule.roles
  const userToken = UserModule.token
  // if (!userToken || userRoles.length < 1) {
  // if (!userToken || userRoles.length < 1) {
  //   whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`)
  //   return
  // }



  console.log('穿透了')
  next()


  
})