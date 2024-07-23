<template>
  <div>
    <h2>Species with Multiple Occurrences</h2>
    <div v-for="species in exposedMultipleOccurrenceSpecies" :key="species">
      <h3>{{ species }}</h3>
      <div v-if="exposedSpeciesMiniTrees[species]">
        <h4>Mini Tree Steps:</h4>
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
            <tr v-for="step in exposedSpeciesMiniTrees[species]" :key="step.leadId">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import type { KeyLead } from '@/types'

const keyStore = useKeyStore()

// Non-reactive data
let speciesOccurrences: { [species: string]: { count: number; leadIds: number[] } } = {}
let speciesMiniTrees: { [species: string]: KeyLead[] } = {}
let multipleOccurrenceSpecies: string[] = []

// Refs to expose data to the template
const exposedMultipleOccurrenceSpecies = ref<string[]>([])
const exposedSpeciesMiniTrees = ref<{ [species: string]: KeyLead[] }>({})

const processSpeciesOccurrences = () => {
  const rawStepsList = toRaw(keyStore.stepsList)
  if (!rawStepsList) return

  rawStepsList.forEach((step) => {
    if (step.leadSpecies) {
      if (!speciesOccurrences[step.leadSpecies]) {
        speciesOccurrences[step.leadSpecies] = { count: 0, leadIds: [] }
      }
      speciesOccurrences[step.leadSpecies].count++
      speciesOccurrences[step.leadSpecies].leadIds.push(step.leadId)
    }
  })

  multipleOccurrenceSpecies = Object.entries(speciesOccurrences)
    .filter(([_, data]) => data.count > 1)
    .map(([species, _]) => species)

  // Update the exposed ref
  exposedMultipleOccurrenceSpecies.value = [...multipleOccurrenceSpecies]
}

const loadMiniTrees = async () => {
  for (const species of multipleOccurrenceSpecies) {
    speciesMiniTrees[species] = await keyStore.getMiniTree(species)
  }
  // Update the exposed ref
  exposedSpeciesMiniTrees.value = { ...speciesMiniTrees }
}

onMounted(async () => {
  processSpeciesOccurrences()
  await loadMiniTrees()
})
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
