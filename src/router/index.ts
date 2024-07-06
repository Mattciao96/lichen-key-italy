import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useKeyStore } from '@/stores/keyStore'
//import { useFormStore } from '@/stores/formStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    /*{
      path: '/filter-taxa',
      name: 'filter-taxa',
      component: () => import('../views/FilterTaxaView.vue')
    },*/
    {
      path: '/filter-taxa/:letter?',
      name: 'FilterTaxa',
      component: () => import('../views/FilterTaxaView.vue')
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
        },
        {
          path: 'interactive',
          name: 'interactive',
          component: () => import('../views/key/KeyInteractiveView.vue'),
          meta: { requiresKeyData: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresKeyData && to.params.keyId) {
    const keyStore = useKeyStore()
    //const formStore = useFormStore()
    const keyId = to.params.keyId as string

    if (keyId !== keyStore.keyId) {
      //formStore.resetForm()
      keyStore.setKeyId(keyId)
    }
  }
  next()
})

export default router
