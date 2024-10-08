import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Aura from '@/presets/aura'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura
})
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true
})

app.mount('#app')
