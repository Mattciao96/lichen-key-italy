<template>
  <div>
    <h2>Species with Multiple Occurrences</h2>
    <div v-for="species in displayedData" :key="species">
      <h3 class="text-xl font-semibold">{{ species }}</h3>
      <div v-if="speciesMiniTrees[species]">
        <table>
          <thead>
            <tr>
              <th>Couplet</th>
              <th>Text</th>
              <th>Lead To</th>
              <th>Record ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="step in speciesMiniTrees[species]" :key="step.leadId">
              <td>{{ step.parentId }}</td>
              <td>{{ step.leadText }}</td>
              <td>{{ step.leadId }}</td>
              <td>{{ step.leadRecordId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>Loading mini tree...</div>
    </div>
    <div ref="loadMoreTrigger" v-if="!allLoaded">Loading more...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw, watch } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import { usePaginatedData } from '@/composables/usePaginatedData'
import type { KeyLead } from '@/types'

const keyStore = useKeyStore()

// Reactive data
const speciesMiniTrees = ref<{ [species: string]: KeyLead[] }>({})
let multipleOccurrenceSpecies: string[] = []

const getDuplicateSpecies = () => {
  const rawStepsList = toRaw(keyStore.stepsList)
  if (!rawStepsList) return []

  const speciesOccurrences: { [species: string]: { count: number; leadIds: number[] } } = {}

  rawStepsList.forEach((step) => {
    if (step.leadSpecies) {
      if (!speciesOccurrences[step.leadSpecies]) {
        speciesOccurrences[step.leadSpecies] = { count: 0, leadIds: [] }
      }
      speciesOccurrences[step.leadSpecies].count++
      speciesOccurrences[step.leadSpecies].leadIds.push(step.leadId)
    }
  })

  return Object.entries(speciesOccurrences)
    .filter(([_, data]) => data.count > 1)
    .map(([species, _]) => species)
    .sort((a, b) => a.localeCompare(b))
}

const { displayedData, allLoaded, loadMoreTrigger, setupIntersectionObserver } = usePaginatedData(
  () => multipleOccurrenceSpecies,
  10
)

const loadMiniTreesForDisplayedSpecies = async () => {
  for (const species of displayedData.value) {
    if (!speciesMiniTrees.value[species]) {
      speciesMiniTrees.value[species] = await keyStore.getMiniTree(species)
    }
  }
}

onMounted(async () => {
  multipleOccurrenceSpecies = getDuplicateSpecies()
  setupIntersectionObserver()
  await loadMiniTreesForDisplayedSpecies()
})

// Watch for changes in displayedData and load mini trees for new species
watch(
  displayedData,
  async (newDisplayedData) => {
    await loadMiniTreesForDisplayedSpecies()
  },
  { deep: true }
)
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
