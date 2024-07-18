<template>
  <div class="max-w-4xl mx-auto">
    <FormStepper />
    <NavigationForm
      :actualRoute="actualRoute"
      :previousRoute="previousRoute"
      :nextRoute="nextRoute"
      :isLoading="isLoading"
    />
    <form id="filter-form" @submit.prevent="submitForm">
      <slot />
    </form>
  </div>
</template>
<script setup lang="ts">
// da aggiungere sidebar
import { computed, onMounted } from 'vue'
import Button from 'primevue/button'
import FormStepper from '@/components/form/FormStepper.vue'
import NavigationForm from '@/components/form/NavigationForm.vue'
import { RouterLink, useRoute } from 'vue-router'
// imports for submit
import { useKeyFilterMutation } from '@/composables/useKeyApi'
import { useFormStore } from '@/stores/formStore'
import { useKeyStore } from '@/stores/keyStore'
import { useSpeciesStore } from '@/stores/speciesStore'
import { useRouter } from 'vue-router'

const route = useRoute()
const formRoutes = ['/filter-area', '/filter-ecology', '/filter-traits']
const actualRoute = route.fullPath
const actualRouteIndex = formRoutes.indexOf(actualRoute)
const nextRoute = actualRouteIndex === 2 ? null : formRoutes[actualRouteIndex + 1]
const previousRoute = actualRouteIndex === 0 ? null : formRoutes[actualRouteIndex - 1]

// submit code
const keyFilterMutation = useKeyFilterMutation()

const formStore = useFormStore()
const keyStore = useKeyStore()

const speciesStore = useSpeciesStore()
const router = useRouter()

const isLoading = computed(() => keyFilterMutation.isPending.value)

const submitForm = async () => {
  try {
    /*const keyStore = useKeyStore()
    const formStore = useFormStore()*/

    keyStore.resetStore() // This replaces recordStore.resetRecords()

    const filters = formStore.getFormValuesForSubmission()
    const result = await keyFilterMutation.mutateAsync(filters)

    keyStore.setKeyId(result['key-id'])
    //await keyStore.fetchData() // This will fetch and set all necessary data
    formStore.resetForm()
    // Navigate to the key view
    await router.push(`/${result['key-id']}/species-list`)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

// on mount reset speciestore
</script>
