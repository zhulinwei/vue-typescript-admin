# vue-typescript-admin

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
# 安装Vue Cli
npm install -g @vue/cli
```

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
