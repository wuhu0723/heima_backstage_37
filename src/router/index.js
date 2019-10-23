// 1.引入vue
import Vue from 'vue'
// 2.引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import Login from '@/pages/login.vue'
import Index from '@/pages/index.vue'
import Welcome from '@/pages/welcome.vue'
import PostList from '@/pages/postList.vue'
import PostAdd from '@/pages/postAdd.vue'
// 3.use
Vue.use(VueRouter)

// 4.创建路由对象
const router = new VueRouter({
  // 5.添加路由配置
  routes: [
    // 6.添加具体的路由配置---路由映射组件
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/',
      component: Index,
      // 添加重定向,自动的加载重定向所设置的路由所映射的组件
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'Welcome',
          path: 'wel',
          component: Welcome
        },
        {
          name: 'PostList',
          path: 'postlist',
          component: PostList
        },
        {
          name: 'PostAdd',
          path: 'postAdd',
          component: PostAdd
        }
      ]
    }
  ]
})

// 添加导航守卫--路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('heima_backstage_37_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

// 7.导出
export default router
