// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { utils } from "../utils/functions.js";

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
      path: '/pin',
      name: 'pin',
      component: () => import('../views/auth/Pin.vue')
    },
    {
      path: '/vizualize/:id',
      name: 'note',
      component: () => import('../views/Main.vue')
    }
  ]
});

//gerenciamento de acesso de rotas
router.beforeEach((to, from, next) => {
  const isUserLoggedIn = utils.general.get_cookie('pass');

  if (!isUserLoggedIn && to.name !== 'login') {

    //rotas liberadas sem login..
    if (to.name == 'pin') {
      next();
    }else{
      next({ name: 'login' });
    }

    
  } else {
    //rotas que user n pode acessar logado..
    next();    
  }
});

export default router;
