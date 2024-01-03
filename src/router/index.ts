import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Verify from '@/views/VerifyCode.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, 
    {
      path: '/register',
      name: 'register',
      component: Register
    }, 

    {
      path: '/verifyCode',
      name: 'verifyCode',
      component: Verify
    }, 
   
  ]
})

export default router
