import { createRouter, createWebHistory } from 'vue-router';
import Admin_Categories from '@/views/Admin_Categories.vue';
import Admin_Users from '@/views/Admin_Users.vue'

import Register from '@/views/user/Register.vue';
import Verify from '@/views/user/VerifyCode.vue';
import Login from '@/views/user/Login.vue';
import My_account from '@/views/user/My_account.vue';
import Edit_user from '@/views/user/Edit_user.vue';
import Forget_password from '@/views/user/Forget_password.vue';
import Edit_category from '@/views/category/Edit_category.vue';
import Details_category from '@/views/category/Details_category.vue'
import Add_announce from "@/views/announce/Add_announce.vue";
import Edit_announce from "@/views/announce/Edit_announce.vue";
import Announce from "@/views/announce/Announce.vue";
import NotFound from "@/views/NotFound.vue"



const isAuthenticated = () => {
  return localStorage.getItem('token');
};

const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');

const isAdmin = () => {
  const expectedRole = 'admin';

  return userRoles.includes(expectedRole);
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'announcement',
      component: Announce
    }, 
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next();
        } else {
          next('/');
        }
      },
    }, 
    {
      path: '/verifyCode',
      name: 'verifyCode',
      component: Verify,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next();
        } else {
          next('/');
        }
      },
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/my_account',
      name: 'my_account',
      component: My_account, 
      meta: { requiresAuth: true } 
    },
    {
      path: '/edit_user',
      name: 'edit_user',
      component: Edit_user,
      meta: { requiresAuth: true } 
    },
    {
      path :'/forget_password',
      name : 'forget_password',
      component: Forget_password
    },
    {
      path: '/edit_category/:id',
      name: 'edit_category',
      component: Edit_category,
      beforeEnter: (to, from, next) => {
        if (isAdmin()) {
          next();
        } else {
          next('/');
        }
      },
      
    },
    {
      path: '/details_category/:id',
      name: 'details_category',
      component: Details_category,
      beforeEnter: (to, from, next) => {
        if (isAdmin()) {
          next();
        } else {
          next('/');
        }
      },
      
    },
    {
      path: '/add_announce',
      name: 'add_announce',
      component: Add_announce,
      meta: { requiresAuth: true } 
    },
    {
      path: '/admin/categories',
      name: 'admin_categories',
      component: Admin_Categories,
      beforeEnter: (to, from, next) => {
        if (isAdmin()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/admin/users',
      name: 'admin_users',
      component: Admin_Users,
      beforeEnter: (to, from, next) => {
        if (isAdmin()) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/edit_announce/:id',
      name: 'edit_announce',
      component: Edit_announce,
      meta: { requiresAuth: true } 
    },
    {
      path: '/:notFound',
      name: 'notFound',
      component: NotFound,
   
    },
  ]
});

export default router;
