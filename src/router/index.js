import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')
const List = () => import('../views/List.vue')
const Publish = () => import('../views/Publish.vue')

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: Index,
    // 嵌套路由
    children: [
      { path: '/', component: List },
      { path: '/publish', component: Publish }
    ]
  },
  { path: '/login', component: Login }

]

const router = new VueRouter({
  routes
})

// 配置全局的导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 去登录页放行 去其他页面必须带有token
  if (to.path === '/login' || token) {
    next()
  } else {
    router.push('/login')
    // next('/login')
  }
})

export default router
