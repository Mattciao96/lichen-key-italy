<template>
  <div class="container mx-auto py-2 sm:px-4">
    <LoadingSpinner v-if="keyStore.isLoading" />

    <div
      v-else-if="keyStore.error"
      class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ keyStore.error }}</span>
    </div>

    <div v-else>
      <div class="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div
          class="mb-4 flex w-full flex-row items-start justify-between sm:mb-0 sm:h-16 sm:w-auto sm:flex-col sm:justify-center sm:px-0"
        >
          <p>
            <span class="font-bold">{{ keyStore.speciesCount }}</span> total species
          </p>
          <p v-if="keyStore.speciesCount !== keyStore.currentSpeciesCount" class="">
            <span class="font-bold">{{ keyStore.currentSpeciesCount }}</span> remaining species
          </p>
        </div>
        <nav class="flex flex-wrap gap-2">
          <RouterLink
            v-for="(route, index) in routes"
            :key="index"
            :to="route.path"
            class="rounded border border-surface-300 bg-white px-3 py-2 text-sm font-medium text-surface-700 transition duration-150 ease-in-out hover:bg-primary-500/30"
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
    label: 'Textual keys'
  },
  {
    path: { name: 'interactive', params: { keyId: route.params.keyId } },
    name: 'interactive',
    label: 'Interactive key'
  },
  {
    path: { name: 'species', params: { keyId: route.params.keyId } },
    name: 'species',
    label: 'Gallery'
  },
  {
    path: { name: 'species-list', params: { keyId: route.params.keyId } },
    name: 'species-list',
    label: 'Species list'
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
