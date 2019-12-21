# vue-typescript-admin

本文在复用[vue-typescript-admin-template](https://github.com/armour/vue-typescript-admin-template)代码与样式的情况下，根据实际业务需求进行二次开发

## 前序准备
开始本项目之前，需要对以下模块有所了解
- TypeScript：JavaScript超集
- Vue：渐进式Javascript框架
- Vuex：专为Vue应用程序提供的状态管理模式
- Vue Router：Vue官方的路由管理器
- Vue Cli: Vue开发标准工具
- Axios：基于Promise的HTTP客户端
- Element UI：基于Vue的桌面端组件库

## 创建项目
```
# 安装脚手架
npm install -g @vue/cli
# 初始化项目
vue create vue-typescripe-admin
```
过程如图示：

![init](./public/img/Snipaste_2019-12-19_16-45-11.png)
![init](./public/img/Snipaste_2019-12-19_16-47-49.png)

## 目录结构

```
├── public                      # 公共资源目录
├── src                         # main source code
│   ├── assets                 	# 资源目录 (processed by webpack)
│   ├── components             	# 组件目录
│   ├── locals             		  # 本地化
│   ├── model                  	# 结构体
│   ├── plugins                	# vue 插件引入及初始化
│   ├── router                 	# 路由
│   ├── store                  	# vuex数据结构
│   ├── utils                 	# 封装的工具目录
│   ├── views                  	# 页面vue
│   ├── App.vue                	# vue入口
│   ├── main.ts                	# 应用入口
├── tests/                     	# tests
├── .browserslistrc            	# browserslist config file (to support Autoprefixer)
├── .editorconfig              	# editor code format consistency config
├── .env.xxx                   	# env variable configuration
├── .eslintrc.js               	# eslint config
├── babel.config.js            	# babel config
├── cypress.json               	# e2e test config
├── package.json               	# package.json
├── tsconfig.json              	# typescript config
└── vue.config.js              	# vue-cli config
```

## 插件安装
```
# 安装elment ui
yarn add axios@0.19.0
yarn add vue-i18n@8.15.1
yarn add js-cookie@2.2.1
yarn add vue-svgicon@3.2.6
yarn add element-ui@2.12.0
yarn add normalize.css@8.0.1
yarn add path-to-regexp@3.0.0
yarn add vuex-module-decorators@0.10.1

yarn add sass@1.22.10 --dev
yarn add sass-loader@7.3.1 --dev
yarn add @types/js-cookie@2.2.2 --dev
yarn add style-resources-loader@1.2.1 --dev
yarn add vue-cli-plugin-style-resources-loader@0.1.3 --dev

```

## 基本样式
复用原项目中`src/styles`样式，具体文件如下：
- index.scss：全局基本样式
- element-variables.scss：Element-ui样式
- _transition.scss：动画样式
- _svgicon：svg图标样式

## 过程记录

### 国际化/多语言

- 复用原项目src/lang文件夹
- 声明lang文件，获得的代码补全、接口提示等功能
```
// src/shims.d.ts
declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}
```
- 引入使用
```
// src/main.ts
import i18n from '@/lang'
import ElementUI from 'element-ui'
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})
new Vue({
  ...
  i18n,
  ...
}).$mount('#app')
```

### 路由与侧边栏
发现原项目中作者在路由和侧边栏中复用同一份代码，混淆了路由资源和用户权限的概念，笔者将两个概念单独整理，分别处理

- 路由资源：router文件只定义前端拥有的资源，即用户选择某路径时前端应该渲染哪个页面。不要在路由中定义与用户权限相关的信息
```
// src/router/index.ts
import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      }
    ]
  },
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})
```
- 侧边栏展示：如何给不同的用户展示侧边栏有很多种方案，如后端根据用户角色生成路由后返回或者后端直接返回路由后再由前端根据用户角色进行过滤匹配。不应该复用路由资源的配置
```
// src/mock.ts
export const menus = [{
  name: "dashboard",
  path: "/dashboard",
  icon: "dashboard"
}]

// src/layoyt/components/Sidebar/index.vue
...
import * as mock from '@/mock'
...
export default class extends Vue {
  ...
  get routes() {
    return mock.menus
  }
  ...
}
...

// src/layoyt/components/Sidebar/SidebarItem.vue
<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild" :to="resolvePath(theOnlyOneChild.path)" >
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)" :class="{'submenu-title-noDropdown': isFirstLevel}" >
          <svg-icon v-if="theOnlyOneChild.icon" :name="theOnlyOneChild.icon" />
          <span v-if="theOnlyOneChild.name" slot="title" >{{ $t('route.' + theOnlyOneChild.name) }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body >
      <template slot="title">
        <svg-icon v-if="item.icon" :name="item.icon" />
        <span v-if="item.name" slot="title" > {{ $t('route.' + item.name) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>
```


## 启动项目
### 开发启动
```
yarn serve
```

### 生产打包
```
yarn build
```

### 单元测试
```
yarn test:unit
```