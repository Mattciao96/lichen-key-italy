import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/KeyView.vue')
    }
  ]
})

export default router
