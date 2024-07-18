import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useKeyStore } from '@/stores/keyStore'
import { useSpeciesStore } from '@/stores/speciesStore'
import { useFormStore } from '@/stores/formStore'

const router = createRouter({
  history: createWebHistory('/key-test/'),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
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
      path: '/filter-species/:letter?',
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
        },
        {
          path: 'refine',
          name: 'refine',
          component: () => import('../views/key/KeyRefineView.vue'),
          meta: { requiresKeyData: true }
        }
      ]
    }
  ]
})

const routeGroups = {
  form: {
    routes: ['/filter-area', '/filter-ecology', '/filter-traits'],
    resetStore: () => useFormStore().resetForm()
  },
  taxa: {
    routes: ['/filter-species'],
    resetStore: () => useSpeciesStore().reset()
  }
}

const isFirstLoad = { form: true, taxa: true }

router.beforeEach((to, from, next) => {
  // Handle store resets for form and taxa routes
  Object.entries(routeGroups).forEach(([group, { routes, resetStore }]) => {
    const isCurrentRoute = routes.some((route) => to.path.startsWith(route))
    const wasLastRoute = routes.some((route) => from.path.startsWith(route))

    if (isCurrentRoute && (isFirstLoad[group] || !wasLastRoute)) {
      resetStore()
      isFirstLoad[group] = false
    } else if (!isCurrentRoute) {
      isFirstLoad[group] = true
    }
  })

  // Handle key data requirement
  if (to.meta.requiresKeyData && to.params.keyId) {
    const keyStore = useKeyStore()
    const keyId = to.params.keyId as string

    if (keyId !== keyStore.keyId) {
      keyStore.setKeyId(keyId)
    }
  }

  next()
})

export default router
