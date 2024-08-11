import { createRouter, createWebHistory } from 'vue-router'
import { useKeyStore } from '@/stores/keyStore'
import { useSpeciesStore } from '@/stores/speciesStore'
import { useFormStore } from '@/stores/formStore'

import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import FormLayout from '@/layouts/FormLayout.vue'
import FilterGeneralView from '@/views/form/FilterGeneralView.vue'
import FilterTraitsView from '@/views/form/FilterTraitsView.vue'
import FilterEcologyView from '@/views/form/FilterEcologyView.vue'
import FilterTaxaView from '@/views/form/FilterTaxaView.vue'
import KeyLayout from '@/layouts/KeyLayout.vue'
import KeyStepsView from '@/views/key/KeyStepsView.vue'
import KeyTaxaView from '@/views/key/KeyTaxaView.vue'
import KeyTaxaNamesView from '@/views/key/KeyTaxaNamesView.vue'
import KeyInteractiveView from '@/views/key/KeyInteractiveView.vue'
import KeyRefineView from '@/views/key/KeyRefineView.vue'
import KeyDuplicateView from '@/views/key/KeyDuplicateView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import CitationView from '@/views/CitationView.vue'

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
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'how-to-cite',
          name: 'how-to-cite',
          component: CitationView
        },
        {
          path: 'filters/',
          name: 'filters',
          component: FormLayout,
          redirect() {
            return { name: 'general' }
          },
          children: [
            {
              path: 'general',
              name: 'general',
              component: FilterGeneralView
            },
            {
              path: 'traits',
              name: 'traits',
              component: FilterTraitsView
            },
            {
              path: 'ecology',
              name: 'ecology',
              component: FilterEcologyView
            }
          ]
        },
        {
          path: 'filter-species/:letter?',
          name: 'FilterTaxa',
          component: FilterTaxaView
        },
        {
          path: ':keyId/nodes/:nodeId/',
          name: 'key-node',
          component: KeyLayout,
          meta: { requiresKeyData: true, requiresNodeData: true },
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
                  component: KeyStepsView,
                  meta: { requiresKeyData: true }
                }
              ]
            },
            {
              path: 'species',
              name: 'species',
              component: KeyTaxaView,
              meta: { requiresKeyData: true }
            },
            {
              path: 'species-list',
              name: 'species-list',
              component: KeyTaxaNamesView,
              meta: { requiresKeyData: true }
            },
            {
              path: 'interactive',
              name: 'interactive',
              component: KeyInteractiveView,
              meta: { requiresKeyData: true }
            },
            {
              path: 'refine',
              name: 'refine',
              component: KeyRefineView,
              meta: { requiresKeyData: true }
            },
            {
              path: 'duplicate',
              name: 'duplicate',
              component: KeyDuplicateView,
              meta: { requiresKeyData: true }
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
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
    const formStore = useFormStore()
    const keyId = to.params.keyId as string

    if (keyId !== keyStore.keyId) {
      keyStore.setKeyId(keyId)
    }

    // Check if the keyId in the URL matches the one in localStorage
    // To maintain filters
    const storedFilterKey = localStorage.getItem('filterKey')
    if (keyId === storedFilterKey) {
      // If it matches, update the formStore's passedFilterFormData
      const storedPassedFilterFormData = localStorage.getItem('passedFilterFormData')
      if (storedPassedFilterFormData) {
        formStore.passedFilterFormData = JSON.parse(storedPassedFilterFormData)
      }
    }
  }

  // to set default italy
  if (to.path.startsWith('/filters/') && !from.path.startsWith('/filters/')) {
    const formStore = useFormStore()
    formStore.updateFormField('area', { value: 'italy', text: 'Only species known from Italy' })
  }

  next()
})

export default router
