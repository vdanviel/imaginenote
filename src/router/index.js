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
      path: '/vizualize/:id',
      name: 'guitar',
      component: () => import('../views/Main.vue')
    }
  ]

});

export default router
