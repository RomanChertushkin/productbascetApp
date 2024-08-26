import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import CartPage from '../views/CartPage.vue'
import LoginPage from '../views/LoginPage.vue'

function isAuthenticated() {
  return !!localStorage.getItem('logined')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
      meta: {
        requiresAuth: true,
        headerNeeded: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta: {
        requiresAuth: true,
        headerNeeded: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        requiresAuth: false,
        headerNeeded: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
