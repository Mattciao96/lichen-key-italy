<template>
  <div class="max-w-4xl mx-auto">
    <LoadingSpinner v-if="isLoading" />
    <div v-else>
      <FormStepper />
      <!--      <form id="filter-form" @submit.prevent="submitForm">-->
      <form id="filter-form" @submit.prevent="submitFormWithRefresh">
        <RouterView />
      </form>
      <NavigationForm :isLoading="isLoading" />
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
import { clearKeyStoreData } from '@/utils/indexedDB'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyFilterMutation = useKeyFilterMutation()
const formStore = useFormStore()
const keyStore = useKeyStore()

const router = useRouter()
const isLoading = ref(false)

//const isLoading = computed(() => keyFilterMutation.isPending.value)

const submitForm = async () => {
  isLoading.value = true

  try {
    keyStore.resetStore()
    const filters = formStore.getFormValuesForSubmission()
    const result = await keyFilterMutation.mutateAsync(filters)
    keyStore.setKeyId(result['key-id'])
    formStore.resetForm()
    await router.push(`/${result['key-id']}/nodes/1/species-list`)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isLoading.value = false
  }
}

const submitFormWithRefresh = async () => {
  isLoading.value = true

  try {
    await clearKeyStoreData()
    keyStore.resetStore()
    const filters = formStore.getFormValuesForSubmission()
    const result = await keyFilterMutation.mutateAsync(filters)
    keyStore.setKeyId(result['key-id'])
    formStore.resetForm()
    await router.push(`/${result['key-id']}/nodes/1/species-list`)
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
