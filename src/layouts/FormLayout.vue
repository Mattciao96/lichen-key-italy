<template>
  <div class="mx-auto max-w-4xl">
    <LoadingSpinner v-if="isLoading" />
    <div class="relative" v-else>
      <FormStepper />
      <NavigationForm :isLoading="isLoading" :hasMobileMenu="false" />

      <form class="text-sm sm:text-base" id="filter-form" @submit.prevent="submitForm">
        <RouterView />
      </form>
      <div class="h-8 w-full"></div>
      <NavigationForm :isLoading="isLoading" :hasMobileMenu="true" />
      <div class="h-4 w-full"></div>
      <FormStepper />
      <div class="h-8 w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FormStepper from '@/components/form/FormStepper.vue'
import NavigationForm from '@/components/form/NavigationForm.vue'
import { useKeyFilterMutation } from '@/composables/useKeyApi'
import { useFormStore } from '@/stores/formStore'
import { useKeyStore } from '@/stores/keyStore'
import { useRouter, RouterView } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
//import FilterModal from '@/components/form/FilterModal.vue'

const keyFilterMutation = useKeyFilterMutation()
const formStore = useFormStore()
const keyStore = useKeyStore()

const router = useRouter()
const isLoading = ref(false)

//const isLoading = computed(() => keyFilterMutation.isPending.value)

const submitForm = async () => {
  isLoading.value = true

  try {
    formStore.resetPassedFilterFormData() // reset saved old filters
    keyStore.resetStore()
    const filters = formStore.getFormValuesForSubmission()

    const result = await keyFilterMutation.mutateAsync(filters)
    keyStore.setKeyId(result['key-id'])
    formStore.setPassedFilterFormData() // save new filters in the memory
    formStore.resetForm()

    // clear local storage
    localStorage.removeItem('filterKey')
    localStorage.removeItem('passedFilterFormData')

    // add filters
    localStorage.setItem('filterKey', result['key-id'])
    localStorage.setItem('passedFilterFormData', JSON.stringify(formStore.passedFilterFormData))

    await router.push(`/${result['key-id']}/nodes/1/species`)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // I may add  speciesStore reset logic here if needed
})
</script>
