<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="keyStore.isLoading" class="text-center text-lg font-semibold">Loading...</div>
    <div v-else-if="isSubmitting" class="text-center text-lg font-semibold">Submitting...</div>
    <div v-else-if="keyStore.error" class="text-center text-red-500 text-lg font-semibold">
      Error: {{ keyStore.error }}
    </div>
    <div v-else>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <div v-for="species in displayedData" :key="species.name" class="flex items-center">
            <input
              type="checkbox"
              :id="species.name"
              v-model="selectedSpecies"
              :value="species"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label :for="species.name" class="ml-2 block text-sm text-gray-900">
              {{ species.name }}
            </label>
          </div>
        </div>
        <div v-if="!allLoaded" ref="loadMoreTrigger" class="h-10"></div>
        <button
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import { useRouter, useRoute } from 'vue-router'
import { useKeyRecordsMutation } from '@/composables/useKeyApi'
import { usePaginatedData } from '@/composables/usePaginatedData'

const keyStore = useKeyStore()
const router = useRouter()
const route = useRoute()
const keyRecordMutation = useKeyRecordsMutation()
const selectedSpecies = ref([])
const isSubmitting = ref(false)

const { displayedData, allLoaded, loadMoreTrigger, setupIntersectionObserver } = usePaginatedData(
  () => keyStore.currentUniqueSpeciesWithRecords
)

onMounted(() => {
  keyStore.setUniqueSpeciesWithRecordsFromNodeId(route.params.nodeId as string)
  setupIntersectionObserver()
})

const handleSubmit = async () => {
  if (selectedSpecies.value.length > 0) {
    isSubmitting.value = true
    const selectedRecords = selectedSpecies.value.flatMap((species) => species.records)

    try {
      const result = await keyRecordMutation.mutateAsync(selectedRecords)
      keyStore.resetStore()
      keyStore.setKeyId(result['key-id'])
      await router.push(`/${result['key-id']}/nodes/1/species-list`)
    } catch (error) {
      console.error('Error submitting selected species:', error)
    } finally {
      isSubmitting.value = false
    }
  } else {
    console.log('No species selected')
  }
}
</script>
