import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomeView from '../views/WelcomeView'
import Chatroom from '../views/ChatRoom'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView
  },
  
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
