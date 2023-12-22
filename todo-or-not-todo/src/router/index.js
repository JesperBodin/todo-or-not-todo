import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import TodoPage from '../components/TodoPage.vue'
import SignUpPage from '../components/SignUpPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: SignUpPage,
    },
    {
      path: '/todo',
      name: 'Todo',
      component: TodoPage,
      meta: {requiresAuth: true},
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('jwtToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
  next({path: '/login'});
  } else {
    next();
  }

})

export default router
