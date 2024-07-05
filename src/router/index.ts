import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useKeyStore } from '@/stores/keyStore'
import { useFormStore } from '@/stores/formStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentsView.vue')
    },
    // pages for filters
    {
      path: '/filter-area',
      name: 'filter-area',
      component: () => import('../views/FilterAreaView.vue')
    },
    {
      path: '/filter-ecology',
      name: 'filter-ecology',
      component: () => import('../views/FilterEcologyView.vue')
    },
    {
      path: '/filter-traits',
      name: 'filter-traits',
      component: () => import('../views/FilterTraitsView.vue')
    },
    {
      path: '/filter-taxa',
      name: 'filter-taxa',
      component: () => import('../views/FilterTaxaView.vue')
    },
    {
      path: '/key',
      name: 'key',
      /*component: () => import('../views/KeyView.vue')*/
      component: () => import('../views/TestKeyStoreView.vue')
    },
    {
      path: '/:keyId/species',
      name: 'species',
      component: () => import('../views/key/KeyTaxaView.vue'),
      meta: { requiresKeyData: true }
    },
    {
      path: '/:keyId/key',
      name: 'key',
      component: () => import('../views/key/KeyStepsView.vue'),
      meta: { requiresKeyData: true }
    },
    {
      path: '/:keyId',
      component: () => import('../layouts/KeyLayout.vue'),
      children: [
        {
          path: 'key',
          name: 'key',
          component: () => import('../views/key/KeyStepsView.vue'),
          meta: { requiresKeyData: true }
        },
        {
          path: 'species',
          name: 'species',
          component: () => import('../views/key/KeyTaxaView.vue'),
          meta: { requiresKeyData: true }
        },
        {
          path: 'species-list',
          name: 'species-list',
          component: () => import('../views/key/KeyTaxaNamesView.vue'),
          meta: { requiresKeyData: true }
        }
      ]
    }
  ]
})

/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresKeyData && to.params.keyId) {
    const keyStore = useKeyStore()
    const formStore = useFormStore()
    const keyId = to.params.keyId as string

    if (keyId !== keyStore.keyId) {
      formStore.resetForm()
      keyStore.setKeyId(keyId)
    }
  }
  next()
})*/

export default router
