import LoginView from '@/workarea/auth/views/LoginView.vue'
import DashboardView from '@/workarea/dashboard/views/DashboardView.vue'
import UserDetailView from '@/workarea/users/views/UserDetailView.vue'
import UsersListView from '@/workarea/users/views/UsersListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideSidebar: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersListView,
    },
    {
      path: '/user/:id',
      name: 'usersDetail',
      component: UserDetailView,
    },
  ],
})

// Navigation guard
router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('token')

  // If trying to access any page except login without being authenticated
  if (!isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }

  // If authenticated and trying to go to login, redirect to users or home
  if (isAuthenticated && to.name === 'login') {
    return { name: 'users' }
  }

  // Otherwise, allow navigation
  return true
})

export default router
