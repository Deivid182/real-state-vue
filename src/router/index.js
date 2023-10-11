import { onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
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
      meta: {
        requiresAuth: true
      },
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
          path: '/admin/edit-property',
          name: 'edit-property',
          component: () => import('../views/admin/edit-property-view.vue')
        }
      ]
    }
  ]
})

const auth = useFirebaseAuth()
const authenticateUser = async () => {
  
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve()
      } else {
        reject()
      }
    })
  })
}


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)


  if (requiresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
