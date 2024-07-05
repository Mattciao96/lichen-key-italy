<template>
  <FormStepper />
  <form id="filter-form" @submit.prevent="submitForm">
    <slot />
  </form>
  <div class="flex justify-around my-10">
    <Button
      :disabled="previousRoute === null"
      class="!w-30"
      severity="contrast"
      icon="pi pi-arrow-left"
    >
      <RouterLink :to="previousRoute">Previous</RouterLink>
    </Button>

    <button type="submit" form="filter-form" :disabled="isLoading">Submit</button>

    <Button
      class="!w-30"
      :disabled="nextRoute === null"
      severity="contrast"
      icon="pi pi-arrow-right"
    >
      <RouterLink :to="nextRoute">Next</RouterLink>
    </Button>
  </div>
</template>
<script setup lang="ts">
// da aggiungere sidebar
import { computed } from 'vue'
import Button from 'primevue/button'
import FormStepper from '@/components/form/FormStepper.vue'
import { RouterLink, useRoute } from 'vue-router'
// imports for submit
import { useKeyFilterMutation } from '@/composables/useKeyApi'
import { useFormStore } from '@/stores/formStore'
import { useKeyStore } from '@/stores/keyStore'
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
const router = useRouter()

const isLoading = computed(() => keyFilterMutation.isPending.value)

/*const submitForm = async () => {
  try {
    recordStore.resetRecords()
    const filters = formStore.getFormValuesForSubmission()
    const result = await keyFilterMutation.mutateAsync(filters)
    recordStore.setRecords(result.records)
    recordStore.setKeyId(result['key-id'])
    await router.push(`/key?key-id=${result['key-id']}`)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}*/
const submitForm = async () => {
  try {
    const keyStore = useKeyStore()
    const formStore = useFormStore()

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
</script>
