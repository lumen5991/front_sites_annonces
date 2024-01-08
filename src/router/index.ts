import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/user/Register.vue'
import Verify from '@/views/user/VerifyCode.vue'
import Login from '@/views/user/Login.vue'
import My_account from '@/views/user/My_account.vue'
import Edit_user from '@/views/user/Edit_user.vue'
import Forget_password from '@/views/user/Forget_password.vue'

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

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/my_account',
      name: 'my_account',
      component: My_account
    },

    {
      path: '/edit_user',
      name: 'edit_user',
      component: Edit_user
    },

    {
      path :'/forget_password',
      name : 'forget_password',
      component: Forget_password
    }
  ]
})

export default router
