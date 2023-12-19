import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import TodoPage from '../components/TodoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/todo',
      name: 'Todo',
      component: TodoPage,
    }
  ]
})

export default router
