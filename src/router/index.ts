import { createRouter, createWebHistory } from 'vue-router'
import { useKeyStore } from '@/stores/keyStore'
import { useSpeciesStore } from '@/stores/speciesStore'
import { useFormStore } from '@/stores/formStore'

/**
 * SITE STRUCTURE
 *
 * / (MainLayout: navbar + footer + scroller)
 * ├── '' (HomeView)
 * ├── filters (FilterLayout: step navigation + command navigation & submit)
 * │   ├── general (FilterGeneralView)
 * │   ├── traits (FilterTraitsView)
 * │   └── ecology (FilterEcologyView)
 * ├── filter-species (FilterTaxaView)
 * ├── keys/:keyId (KeyLayout: key navigation + key content)
 * │   ├── nodes/:nodeId (KeyNodesView)
 *
 *
 */

const router = createRouter({
  history: createWebHistory('/key-maker/'),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/index.html',
      redirect: '/'
    },
    {
      path: '/',
      name: 'base',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'filters/',
          name: 'filters',
          component: () => import('@/layouts/FormLayout.vue'),
          redirect() {
            return { name: 'general' }
          },
          children: [
            {
              path: 'general',
              name: 'general',
              component: () => import('@/views/form/FilterGeneralView.vue')
            },
            {
              path: 'traits',
              name: 'traits',
              component: () => import('@/views/form/FilterTraitsView.vue')
            },
            {
              path: 'ecology',
              name: 'ecology',
              component: () => import('@/views/form/FilterEcologyView.vue')
            }
          ]
        },
        {
          path: 'filter-species/:letter?',
          name: 'FilterTaxa',
          component: () => import('../views/form/FilterTaxaView.vue')
        },
        {
          path: ':keyId/nodes/:nodeId/',
          name: 'key-node',
          component: () => import('@/layouts/KeyLayout.vue'),
          meta: { requiresKeyData: true, requiresNodeData: true },
          // if nodes/:nodeId is not provided, redirect to the first node

          children: [
            {
              path: 'key',
              name: 'key',
              redirect(to) {
                return { name: 'key-view', params: { view: 'detailed' } }
              },
              children: [
                {
                  path: ':view',
                  name: 'key-view',
                  component: () => import('../views/key/KeyStepsView.vue'),
                  meta: { requiresKeyData: true }
                }
              ]
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
            },
            {
              path: 'duplicate',
              name: 'duplicate',
              component: () => import('../views/key/KeyDuplicateView.vue'),
              meta: { requiresKeyData: true }
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
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

  // Handle keyId when navigating to key routes
  if (to.meta.requiresKeyData && to.params.keyId) {
    const keyStore = useKeyStore()
    const keyId = to.params.keyId as string

    if (keyId !== keyStore.keyId) {
      keyStore.setKeyId(keyId)
    }
  }

  // Handle nodeId when navigating the inteactive key
  /*if (to.meta.requiresNodeData && to.params.nodeId) {
    const keyStore = useKeyStore()
    const nodeId = to.params.nodeId as string
    console.log('nodeId', nodeId)
    console.log('keyStore.currentLeadId', keyStore.currentLeadId)
    if (nodeId !== keyStore.currentLeadId) {
      keyStore.setCurrentLeadId(nodeId)
    }
  }*/

  next()
})

export default router
