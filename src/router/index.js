import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
