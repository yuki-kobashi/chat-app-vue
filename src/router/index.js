import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomeView from '../views/WelcomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
