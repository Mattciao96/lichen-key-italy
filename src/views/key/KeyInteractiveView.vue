<template>
  <div v-if="currentNode">
    <h2>Current Node: {{ currentNode.data.leadText }}</h2>
    <p>ID: {{ currentNode.data.leadId }}</p>

    <h3>Statistics:</h3>
    <p>Number of unique remaining species: {{ uniqueSpeciesCount }}</p>

    <h3>Step List:</h3>
    <ol>
      <li v-for="step in stepList" :key="step.leadId">
        {{ step.leadText }}
      </li>
    </ol>

    <div v-if="currentNode.children.length > 0">
      <h3>Children:</h3>
      <div v-for="child in currentNode.children" :key="child.data.leadId">
        <button @click="navigateToNode(child)">
          {{ child.data.leadText }}
        </button>
      </div>
    </div>

    <div v-else>
      <p>This is a leaf node (no children).</p>
    </div>

    <button v-if="!isRoot" @click="navigateToParent">Go to Parent</button>
    <div class="bg-purple-400">
      <h3>Unique Species List:</h3>
      <ul>
        <li v-for="species in uniqueSpeciesList" :key="species">
          {{ species }}
        </li>
      </ul>
    </div>
  </div>
  <h3>Steps:</h3>
  <KeyTable v-memo="[stepList]" :steps-list="stepList"></KeyTable>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import KeyTable from '@/components/key/KeyTable.vue'

const keyStore = useKeyStore()
const currentNode = ref(null)
const currentNodeId = computed(() => currentNode.value?.data.leadId)

const isRoot = computed(() => {
  return currentNode.value && keyStore.keyTree.isRoot(currentNode.value)
})

const uniqueSpeciesCount = computed(() => {
  if (!currentNode.value) return 0
  return keyStore.keyTree.getNumberOfUniqueLeaves(currentNode.value.data.leadId)
})

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

function navigateToNode(node) {
  currentNode.value = node
}

function navigateToParent() {
  if (currentNode.value && currentNode.value.data.parentId) {
    const parentNode = keyStore.keyTree.find(currentNode.value.data.parentId)
    if (parentNode) {
      currentNode.value = parentNode
    }
  }
}
</script>
