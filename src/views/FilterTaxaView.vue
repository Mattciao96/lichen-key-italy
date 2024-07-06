<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="isLoading" class="text-center text-lg font-semibold">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg font-semibold">
      Error: {{ error.message }}
    </div>
    <div v-else>
      <div class="flex flex-wrap gap-2 mb-6">
        <router-link
          v-for="letter in availableLetters"
          :key="letter"
          :to="`/filter-taxa/${letter.toLowerCase()}`"
          :class="[
            'px-3 py-1 rounded-md text-sm font-medium',
            currentLetter.toUpperCase() === letter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ letter }}
        </router-link>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="species in currentPageSpecies" :key="species" class="flex items-center">
            <input
              type="checkbox"
              :id="species"
              v-model="selectedSpeciesLocal"
              :value="species"
              @change="updateSelectedSpecies(species, $event.target.checked)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label :for="species" class="ml-2 block text-sm text-gray-900">
              {{ species }}
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
import { ref, computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute, useRouter } from 'vue-router'
import { useSpeciesStore } from '@/stores/speciesStore'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const speciesStore = useSpeciesStore()

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
  queryFn: fetchChecklist
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
      router.push(`/filter-taxa/${newLetter.toLowerCase()}`)
    } else if (checklist.value) {
      router.push(`/filter-taxa/${availableLetters.value[0].toLowerCase()}`)
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

const handleSubmit = () => {
  console.log('Selected species:', speciesStore.selectedSpecies)
  // Here you can handle the form submission, e.g., send data to an API
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
<!--
<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="isLoading" class="text-center text-lg font-semibold">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg font-semibold">
      Error: {{ error.message }}
    </div>
    <div v-else>
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="letter in availableLetters"
          :key="letter"
          @click="setCurrentLetter(letter)"
          :class="[
            'px-3 py-1 rounded-md text-sm font-medium',
            currentLetter === letter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ letter }}
        </button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="species in currentPageSpecies" :key="species" class="flex items-center">
            <input
              type="checkbox"
              :id="species"
              v-model="selectedSpecies"
              :value="species"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label :for="species" class="ml-2 block text-sm text-gray-900">
              {{ species }}
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
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const selectedSpecies = ref<string[]>([])
const currentLetter = ref('A')

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
  queryFn: fetchChecklist
})

const availableLetters = computed(() => {
  if (!checklist.value) return []
  const letters = new Set(checklist.value.map((species) => species[0].toUpperCase()))
  return Array.from(letters).sort()
})

const currentPageSpecies = computed(() => {
  if (!checklist.value) return []
  return checklist.value.filter((species) => species.toUpperCase().startsWith(currentLetter.value))
})

const setCurrentLetter = (letter: string) => {
  currentLetter.value = letter
}

const handleSubmit = () => {
  console.log('Selected species:', selectedSpecies.value)
  // Here you can handle the form submission, e.g., send data to an API
}
</script>
-->
