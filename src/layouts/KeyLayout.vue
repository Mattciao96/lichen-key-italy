<template>
  <div class="container mx-auto py-2 lg:px-4">
    <LoadingSpinner v-if="keyStore.isLoading" />

    <div
      v-else-if="keyStore.error"
      class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block lg:inline">{{ keyStore.error }}</span>
    </div>

    <div v-else>
      <div class="mb-6 flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <div
          class="mb-4 flex w-full flex-row-reverse items-start justify-between lg:mb-0 lg:h-16 lg:w-auto lg:flex-col lg:justify-center lg:px-0"
        >
          <p>
            <span class="font-bold">{{ keyStore.speciesCount }}</span> total species
          </p>
          <p v-if="keyStore.speciesCount !== keyStore.currentSpeciesCount" class="">
            <span class="font-bold">{{ keyStore.currentSpeciesCount }}</span> remaining species
          </p>
        </div>

        <!--        <nav class="flex flex-wrap gap-2">
          <RouterLink
            v-for="(route, index) in routes"
            :key="index"
            :to="route.path"
            class="rounded border border-surface-300 bg-white px-3 py-2 text-sm font-medium text-surface-700 transition duration-150 ease-in-out hover:bg-primary-500/30"
            activeClass="!bg-primary-500 text-white border-green-500 hover:bg-primary-600"
          >
            {{ route.label }}
          </RouterLink>
          &lt;!&ndash;button to see filters&ndash;&gt;
          <div v-if="Object.keys(formStore.passedFilterFormData).length !== 0">
            <FilterModalShowOnly />
          </div>
        </nav>-->
        <div class="max-w-full overflow-x-auto">
          <nav class="flex flex-nowrap gap-2 pb-2">
            <RouterLink
              v-for="(route, index) in routes"
              :key="index"
              :to="route.path"
              class="whitespace-nowrap rounded border border-surface-300 bg-white px-3 py-2 text-sm font-medium text-surface-700 transition duration-150 ease-in-out hover:bg-primary-500/30"
              activeClass="!bg-primary-500 text-white border-green-500 hover:bg-primary-600"
            >
              {{ route.label }}
            </RouterLink>
            <!--button to see filters-->
            <div
              v-if="Object.keys(formStore.passedFilterFormData).length !== 0"
              class="flex-shrink-0"
            >
              <FilterModalShowOnly />
            </div>
          </nav>
        </div>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKeyStore } from '@/stores/keyStore'
import { useFormStore } from '@/stores/formStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import FilterModalShowOnly from '@/components/form/FilterModalShowOnly.vue'

const keyStore = useKeyStore()
const formStore = useFormStore()
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
    path: { name: 'species-list', params: { keyId: route.params.keyId } },
    name: 'species-list',
    label: 'Species list'
  },
  {
    path: { name: 'species', params: { keyId: route.params.keyId } },
    name: 'species',
    label: 'Gallery'
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
