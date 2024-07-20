<template>
  <div>
    <div class="button-group">
      <button @click="activeView = 'interactive'" :class="{ active: activeView === 'interactive' }">
        Interactive Key
      </button>
      <button @click="activeView = 'species'" :class="{ active: activeView === 'species' }">
        Species List
      </button>
      <button @click="activeView = 'steps'" :class="{ active: activeView === 'steps' }">
        Steps List
      </button>
    </div>

    <InteractiveKey v-if="activeView === 'interactive'" v-model:currentNode="currentNode" />

    <div v-if="activeView === 'species'">
      <h3>Unique Species List:</h3>
      <ul>
        <li v-for="species in uniqueSpeciesList" :key="species">
          {{ species }}
        </li>
      </ul>
    </div>

    <div v-if="activeView === 'steps'">
      <h3>Steps:</h3>
      <KeyTable :steps-list="stepList" :key="currentNodeId"></KeyTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import KeyTable from '@/components/key/KeyTable.vue'
import InteractiveKey from '@/components/key/KeyInteractive.vue'

const keyStore = useKeyStore()
const currentNode = ref(null)

const activeView = ref('interactive')

const currentNodeId = computed(() => currentNode.value?.data.leadId)

const uniqueSpeciesList = computed(() => {
  if (!currentNode.value) return []
  const leaves = keyStore.keyTree.getLeaves(currentNodeId.value)
  const speciesSet = new Set(leaves.map((leaf) => leaf.data.leadSpecies).filter(Boolean))
  return Array.from(speciesSet).sort()
})

const stepList = computed(() => {
  if (!currentNode.value) return []
  return keyStore.getStepsListFromNodeId(currentNodeId.value)
})

onMounted(async () => {
  if (!keyStore.keyTree) {
    await keyStore.fetchData()
  }
  currentNode.value = keyStore.keyTree.root
})
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.button-group button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}

.button-group button.active {
  background-color: #007bff;
  color: white;
}
</style>
