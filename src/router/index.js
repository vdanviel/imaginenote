// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { utils } from "../utils/functions.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('../views/Menu.vue'),
      meta: {
        title: 'ImagineNote',
        favicon: '../../public/icon.png'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      meta: {
        title: 'ImagineNote',
        favicon: '../../public/icon.png'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
        title: 'ImagineNote',
        favicon: '../../public/icon.png'
      }
    },
    {
      path: '/verify',
      name: 'pin',
      component: () => import('../views/auth/Pin.vue'),
      meta: {
        title: 'ImagineNote',
        favicon: '../../public/icon.png'
      }
    },
    {
      path: '/vizualize/:id',
      name: 'note',
      component: () => import('../views/note/Note.vue'),
      meta: {
        title: 'ImagineNote',
        favicon: '../../public/icon.png'
      }
    }
  ]
});

//gerenciamento de acesso de rotas
router.beforeEach((to, from, next) => {

  const isUserLoggedIn = utils.general.get_cookie('session');

  if (!isUserLoggedIn && to.name !== 'login') {
    // Rotas liberadas sem login
    if (to.name === 'pin') {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    // Rotas que usuário não pode acessar logado
    if (to.name === 'pin') {
      next({ name: 'menu' }); // Redireciona para outra rota, como 'menu'
    } else {
      next();    
    }
  }
});

export default router;