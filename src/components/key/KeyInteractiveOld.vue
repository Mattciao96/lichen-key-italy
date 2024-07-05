<template>
  <div v-if="currentNode">
    <h2>Current Node: {{ currentNode.data.leadText }}</h2>
    <p>ID: {{ currentNode.data.leadId }}</p>

    <h3>Statistics:</h3>
    <p>Number of unique remaining species: {{ uniqueSpeciesCount }}</p>

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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useKeyStore } from '@/stores/keyStore'

const props = defineProps({
  currentNode: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:currentNode'])

const keyStore = useKeyStore()

const isRoot = computed(() => {
  return props.currentNode && keyStore.keyTree.isRoot(props.currentNode)
})

const uniqueSpeciesCount = computed(() => {
  if (!props.currentNode) return 0
  return keyStore.keyTree.getNumberOfUniqueLeaves(props.currentNode.data.leadId)
})

function navigateToNode(node) {
  emit('update:currentNode', node)
}

function navigateToParent() {
  if (props.currentNode && props.currentNode.data.parentId) {
    const parentNode = keyStore.keyTree.find(props.currentNode.data.parentId)
    if (parentNode) {
      emit('update:currentNode', parentNode)
    }
  }
}
</script>
