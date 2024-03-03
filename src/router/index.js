import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('../views/Menu.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/auth/Verify.vue')
    },
    {
      path: '/vizualize/:id',
      name: 'note',
      component: () => import('../views/Main.vue')
    }
  ]

});

export default router
