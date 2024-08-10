<template>
  <div>
    <InteractiveKey :current-node="currentNode" @update:current-node="updateCurrentNode" />
  </div>
</template>

<script setup lang="ts">
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
  updateURL(newNode.data.leadId)
}

const updateURL = (nodeId) => {
  router.push({
    name: router.currentRoute.value.name,
    params: { ...router.currentRoute.value.params, nodeId: nodeId.toString() }
  })
}
</script>
