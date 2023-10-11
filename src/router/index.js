import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login-view.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/admin-layout.vue'),
      children: [
        {
          path: '/admin/properties',
          name: 'properties',
          component: () => import('../views/admin/admin-view.vue')
        },
        {
          path: '/admin/new-property',
          name: 'new-property',
          component: () => import('../views/admin/new-property-view.vue')
        },
        {
          path: '/admin/properties',
          name: 'properties',
          component: () => import('../views/admin/edit-property-view.vue')
        },
      ]
    }
  ]
})

export default router
