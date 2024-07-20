<template>
  <div class="container mx-auto px-4 py-8">
    <LoadingSpinner v-if="keyStore.isLoading" />

    <div
      v-else-if="keyStore.error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ keyStore.error }}</span>
    </div>

    <div v-else>
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div class="mb-4 sm:mb-0">
          <p class="text-lg font-semibold">Species Count: {{ keyStore.speciesCount }}</p>
        </div>
        <nav class="flex flex-wrap gap-2">
          <RouterLink
            v-for="(route, index) in routes"
            :key="index"
            :to="route.path"
            class="px-3 py-2 text-sm font-medium rounded transition duration-150 ease-in-out border border-surface-300 bg-white text-surface-700 hover:bg-primary-500/30"
            activeClass="!bg-primary-500 text-white border-green-500 hover:bg-primary-600"
          >
            {{ route.label }}
          </RouterLink>
        </nav>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyStore = useKeyStore()
const route = useRoute()

const routes = computed(() => [
  {
    path: { name: 'key', params: { keyId: route.params.keyId } },
    name: 'key',
    label: 'Textual Key'
  },
  {
    path: { name: 'species', params: { keyId: route.params.keyId } },
    name: 'species',
    label: 'Species Images'
  },
  {
    path: { name: 'species-list', params: { keyId: route.params.keyId } },
    name: 'species-list',
    label: 'Species List'
  },
  {
    path: { name: 'interactive', params: { keyId: route.params.keyId } },
    name: 'interactive',
    label: 'Interactive Key'
  },
  {
    path: { name: 'refine', params: { keyId: route.params.keyId } },
    name: 'refine',
    label: 'Adjust Key'
  }
])

const fetchData = async () => {
  if (route.params.keyId === 'full') {
    keyStore.setKeyId('full')
  }
  if (keyStore.keyId) {
    await keyStore.fetchData()
    if (route.params.nodeId) {
      keyStore.setCurrentLeadId(route.params.nodeId as string)
    }
  }
}

onMounted(fetchData)

watch(() => route.params.keyId, fetchData)
watch(
  () => route.params.nodeId,
  (newNodeId) => {
    if (newNodeId) {
      keyStore.setCurrentLeadId(newNodeId as string)
    }
  }
)
</script>
