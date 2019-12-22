import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import 'normalize.css'
import '@/styles/index.scss'
import '@/icons/components'
import '@/styles/element-variables.scss'
import '@/permission'

import i18n from '@/lang'
import ElementUI from 'element-ui'
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})
import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
