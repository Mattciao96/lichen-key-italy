<template>
  <div class="mx-auto max-w-2xl p-4">
    <div v-if="keyStore.isLoading" class="text-center text-lg font-semibold">
      <LoadingSpinner />
    </div>
    <div v-else-if="isSubmitting" class="text-center text-lg font-semibold">
      <LoadingSpinner />
    </div>
    <div v-else-if="keyStore.error" class="text-center text-lg font-semibold text-red-500">
      Error: {{ keyStore.error }}
    </div>
    <div v-else-if="keyStore.speciesCount === 1" class="text-center text-lg font-semibold">
      Not available
    </div>
    <div v-else>
      <p class="mb-4 text-center text-lg">
        Select one or multiple species to remove them from the key
      </p>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <ul class="space-y-3">
          <li v-for="species in displayedData" :key="species.name" class="flex items-center gap-2">
            <div class="relative min-h-5 min-w-5 cursor-pointer" @click="toggleSpecies(species)">
              <input
                type="checkbox"
                :id="species.name"
                v-model="speciesToRemove"
                :value="species"
                class="peer absolute h-5 w-5 cursor-pointer opacity-0"
              />
              <div
                class="absolute h-5 w-5 rounded border border-gray-300 bg-white peer-checked:bg-red-500"
              ></div>
              <svg
                class="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <label :for="species.name" class="block text-sm text-gray-900">
              {{ species.name }}
            </label>
          </li>
          <li v-if="!allLoaded" ref="loadMoreTrigger" class="h-10"></li>
        </ul>

        <button
          type="submit"
          class="w-full rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Remove Selected Species
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import { useFormStore } from '@/stores/formStore'
import { useRouter, useRoute } from 'vue-router'
import { useKeyRecordsMutation } from '@/composables/useKeyApi'
import { usePaginatedData } from '@/composables/usePaginatedData'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyStore = useKeyStore()
const formStore = useFormStore()
const router = useRouter()
const route = useRoute()
const keyRecordMutation = useKeyRecordsMutation()
const speciesToRemove = ref([])
const isSubmitting = ref(false)

const { displayedData, allLoaded, loadMoreTrigger, setupIntersectionObserver } = usePaginatedData(
  () => keyStore.currentUniqueSpeciesWithImages
)

onMounted(() => {
  keyStore.setUniqueSpeciesWithImagesFromNodeId(route.params.nodeId as string)
  setupIntersectionObserver()
})

const toggleSpecies = (species) => {
  const index = speciesToRemove.value.findIndex((s) => s.name === species.name)
  if (index === -1) {
    speciesToRemove.value.push(species)
  } else {
    speciesToRemove.value.splice(index, 1)
  }
}

const handleSubmit = async () => {
  if (speciesToRemove.value.length > 0) {
    isSubmitting.value = true
    const speciesSet = new Set(keyStore.currentUniqueSpeciesWithImages)
    speciesToRemove.value.forEach((species) => speciesSet.delete(species))
    const remainingSpecies = Array.from(speciesSet)
    const remainingRecords = remainingSpecies.flatMap((species) => species.records)

    try {
      formStore.resetPassedFilterFormData() // reset saved old filters
      const result = await keyRecordMutation.mutateAsync(remainingRecords)
      keyStore.resetStore()
      keyStore.setKeyId(result['key-id'])
      await router.push(`/${result['key-id']}/nodes/1/species-list`)
    } catch (error) {
      console.error('Error submitting remaining species:', error)
    } finally {
      isSubmitting.value = false
    }
  } else {
    console.log('No species selected for removal')
  }
}
</script>
