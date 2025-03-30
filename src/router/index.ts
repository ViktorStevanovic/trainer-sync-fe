import LoginView from '@/workarea/auth/views/LoginView.vue'
import UsersListView from '@/workarea/users/views/UsersListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersListView,
    },
  ],
})

router.beforeEach((to, from) => {
  if(!localStorage.getItem('token')){
    return {
      name: 'login'
    }
  }
})

export default router
