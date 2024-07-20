<template>
  <div>
    <InteractiveKey :current-node="currentNode" @update:current-node="updateCurrentNode" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import { useRouter, useRoute } from 'vue-router'

import InteractiveKey from '@/components/key/KeyInteractive.vue'

const keyStore = useKeyStore()
const router = useRouter()
const route = useRoute()

const currentNodeId = computed(() => parseInt(route.params.nodeId))
const currentNode = computed(() => keyStore.getNodeIdFromLeadId(currentNodeId.value))

const updateCurrentNode = (newNode) => {
  currentNode.value = newNode
  updateURL(newNode.data.leadId)
}

const updateURL = (nodeId) => {
  router.push({
    name: router.currentRoute.value.name,
    params: { ...router.currentRoute.value.params, nodeId: nodeId.toString() }
  })
}
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
