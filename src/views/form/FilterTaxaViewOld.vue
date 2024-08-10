<template>
  <div class="mx-auto max-w-2xl p-4">
    <div v-if="isLoading" class="text-center text-lg font-semibold"><LoadingSpinner /></div>
    <div v-else-if="error" class="text-center text-lg font-semibold text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else>
      <div class="mb-6 flex flex-wrap gap-2">
        <router-link
          v-for="letter in availableLetters"
          :key="letter"
          :to="`/filter-species/${letter.toLowerCase()}`"
          :class="[
            'flex min-h-7 min-w-8 items-center justify-center rounded-md text-sm font-medium',
            currentLetter.toUpperCase() === letter
              ? 'bg-primary-500 text-white'
              : 'bg-surface-200 text-surface-900 hover:bg-surface-300'
          ]"
        >
          <span> {{ letter }}</span>
        </router-link>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <ul class="space-y-3">
          <li v-for="species in currentPageSpecies" :key="species" class="flex items-center gap-2">
            <div class="relative min-h-5 min-w-5 cursor-pointer" @click="toggleSpecies(species)">
              <input
                type="checkbox"
                :id="species"
                v-model="selectedSpeciesLocal"
                :value="species"
                class="peer absolute h-5 w-5 cursor-pointer opacity-0"
                @change="updateSelectedSpecies(species, $event.target.checked)"
              />
              <div
                class="absolute h-5 w-5 rounded border border-gray-300 bg-white peer-checked:bg-primary-500"
              ></div>
              <svg
                class="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label :for="species" class="block text-sm text-gray-900">
              {{ species }}
            </label>
          </li>
        </ul>
        <button
          type="submit"
          class="w-full rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute, useRouter } from 'vue-router'
import { useSpeciesStore } from '@/stores/speciesStore'
import { useKeyStore } from '@/stores/keyStore'
import { useFormStore } from '@/stores/formStore'
import axios from 'axios'
import { useKeyTaxaFilterMutation } from '@/composables/useKeyApi'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const speciesStore = useSpeciesStore()
const formStore = useFormStore()
const keyStore = useKeyStore()
const keyTaxaFilterMutation = useKeyTaxaFilterMutation()

const selectedSpeciesLocal = ref<string[]>([])

const fetchChecklist = async () => {
  const response = await axios.get('https://italic.units.it/api/v1/checklist')
  return response.data.checklist
}

const {
  data: checklist,
  isLoading,
  error
} = useQuery({
  queryKey: ['checklist'],
  queryFn: fetchChecklist,
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false
})

const availableLetters = computed(() => {
  if (!checklist.value) return []
  const letters = new Set(checklist.value.map((species) => species[0].toUpperCase()))
  return Array.from(letters).sort()
})

const currentLetter = computed(() => {
  return (route.params.letter as string) || 'a'
})

const currentPageSpecies = computed(() => {
  if (!checklist.value) return []
  return checklist.value.filter((species) =>
    species.toUpperCase().startsWith(currentLetter.value.toUpperCase())
  )
})

watch(
  () => route.params.letter,
  (newLetter) => {
    if (newLetter && availableLetters.value.includes(newLetter.toUpperCase())) {
      router.push(`/filter-species/${newLetter.toLowerCase()}`)
    } else if (checklist.value) {
      router.push(`/filter-species/${availableLetters.value[0].toLowerCase()}`)
    }
  },
  { immediate: true }
)

const updateSelectedSpecies = (species: string, isChecked: boolean) => {
  if (isChecked) {
    speciesStore.addSpecies(species)
  } else {
    speciesStore.removeSpecies(species)
  }
}

const toggleSpecies = (species: string) => {
  const isCurrentlySelected = selectedSpeciesLocal.value.includes(species)
  updateSelectedSpecies(species, !isCurrentlySelected)
  // Toggle the local state
  if (isCurrentlySelected) {
    selectedSpeciesLocal.value = selectedSpeciesLocal.value.filter((s) => s !== species)
  } else {
    selectedSpeciesLocal.value.push(species)
  }
}

const handleSubmit = async () => {
  console.log('Selected species:', speciesStore.selectedSpecies)
  try {
    /*const keyStore = useKeyStore()
    const formStore = useFormStore()*/
    formStore.resetPassedFilterFormData() // reset saved old filters
    keyStore.resetStore() // This replaces recordStore.resetRecords()

    const filters = speciesStore.selectedSpecies
    const result = await keyTaxaFilterMutation.mutateAsync(filters)

    keyStore.setKeyId(result['key-id'])
    //await keyStore.fetchData() // This will fetch and set all necessary data
    speciesStore.reset()
    // Navigate to the key view
    await router.push(`/${result['key-id']}/nodes/1/species-list`)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

// Initialize local selected species from store
selectedSpeciesLocal.value = speciesStore.selectedSpecies

// Update local selected species when store changes
watch(
  () => speciesStore.selectedSpecies,
  (newSelectedSpecies) => {
    selectedSpeciesLocal.value = newSelectedSpecies
  }
)
</script>
