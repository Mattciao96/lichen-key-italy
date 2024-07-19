<template>
  <div class="max-w-4xl mx-auto">
    <FormStepper />

    <form id="filter-form" @submit.prevent="submitForm">
      <slot />
    </form>
    <NavigationForm :isLoading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import FormStepper from '@/components/form/FormStepper.vue'
import NavigationForm from '@/components/form/NavigationForm.vue'
import { useKeyFilterMutation } from '@/composables/useKeyApi'
import { useFormStore } from '@/stores/formStore'
import { useKeyStore } from '@/stores/keyStore'
import { useRouter } from 'vue-router'

const keyFilterMutation = useKeyFilterMutation()
const formStore = useFormStore()
const keyStore = useKeyStore()

const router = useRouter()

const isLoading = computed(() => keyFilterMutation.isPending.value)

const submitForm = async () => {
  try {
    keyStore.resetStore()
    const filters = formStore.getFormValuesForSubmission()
    const result = await keyFilterMutation.mutateAsync(filters)
    keyStore.setKeyId(result['key-id'])
    formStore.resetForm()
    await router.push(`/${result['key-id']}/species-list`)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

onMounted(() => {
  // Add your speciesStore reset logic here if needed
})
</script>
