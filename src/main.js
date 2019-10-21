import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
// 引入路由模块
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
