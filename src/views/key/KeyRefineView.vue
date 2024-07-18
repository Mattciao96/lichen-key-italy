<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="isLoading" class="text-center text-lg font-semibold">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg font-semibold">
      Error: {{ error }}
    </div>
    <div v-else>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <div v-for="species in speciesWithRecords" :key="species.name" class="flex items-center">
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
import { ref, computed } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import { useRouter } from 'vue-router'
import { useKeyTaxaFilterMutation } from '@/composables/useKeyApi'

const keyStore = useKeyStore()
const router = useRouter()
const keyTaxaFilterMutation = useKeyTaxaFilterMutation()

const { getUniqueSpeciesWithRecords, isLoading, error } = keyStore

const speciesWithRecords = computed(() => getUniqueSpeciesWithRecords())

const selectedSpecies = ref([])

const handleSubmit = async () => {
  if (selectedSpecies.value.length > 0) {
    const selectedRecords = selectedSpecies.value.flatMap((species) => species.records)
    console.log('Selected species records:', selectedRecords)

    /*try {
      // Reset the key store
      keyStore.resetStore()

      // Use the keyTaxaFilterMutation to get the key ID
      const result = await keyTaxaFilterMutation.mutateAsync(selectedRecords)

      // Set the key ID from the mutation result
      keyStore.setKeyId(result['key-id'])

      // Navigate to the key view
      await router.push(`/${result['key-id']}/species-list`)
    } catch (error) {
      console.error('Error submitting form:', error)
    }*/
  } else {
    console.log('No species selected')
  }
}
</script>
