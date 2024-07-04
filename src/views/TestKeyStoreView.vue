<template>
  <div v-if="keyStore.isLoading" class="loading-overlay">
    <div class="loading-spinner"></div>
    <p>Loading...</p>
  </div>

  <div v-else-if="keyStore.error" class="error-message">
    {{ keyStore.error }}
  </div>

  <div v-else>
    <div class="bg-red-300">{{ keyStore.keyId }}</div>
    <div class="bg-yellow-300">Rimasti: {{ keyStore.speciesCount }}</div>
    <div>
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <div
            v-for="species in keyStore.uniqueSpeciesWithImages"
            :key="species.name"
            class="flex flex-col"
          >
            <div class="relative pb-3/4 w-full overflow-hidden rounded-md">
              <img
                v-if="species.image"
                :src="`https://italic.units.it/flora/${species.image}`"
                :alt="species.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div
                v-else
                class="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center"
              >
                <span class="text-gray-500">No Image</span>
              </div>
            </div>
            <p
              class="mt-2 text-center text-xs sm:text-sm xl:text-base font-medium text-gray-800 line-clamp-2"
            >
              {{ species.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 border-b">Couplet</th>
          <th class="py-2 px-4 border-b">Lead Text</th>
          <th class="py-2 px-4 border-b">Images</th>
          <th class="py-2 px-4 border-b">Lead to</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in keyStore.stepsList" :key="item.leadId" class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b" :id="`couplet${item.parentId}`">{{ item.parentId }}</td>
          <td class="py-2 px-4 border-b" v-html="item.leadText"></td>
          <td class="py-2 px-4 border-b">
            <img
              v-if="item.leadImage"
              :src="`https://italic.units.it/flora/${item.leadImage}`"
              loading="lazy"
              alt="Lead Image"
              class="w-12 h-12 object-cover"
            />
            <img
              v-if="item.speciesImage"
              :src="`https://italic.units.it/flora/${item.speciesImage}`"
              alt="Species Image"
              loading="lazy"
              class="w-12 h-12 object-cover mt-1"
            />
          </td>
          <td class="py-2 px-4 border-b">
            <a :href="`#couplet${item.leadId}`">{{ item.leadId }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useKeyStore } from '@/stores/keyStore'
import { useFormStore } from '@/stores/formStore'

const route = useRoute()
const keyStore = useKeyStore()
const formsStore = useFormStore()

onMounted(async () => {
  formsStore.resetForm()
  const routeKeyId = route.query['key-id'] as string
  if (routeKeyId) {
    keyStore.setKeyId(routeKeyId)
    await keyStore.fetchData()
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  color: red;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}
.pb-3\/4 {
  padding-bottom: 75%;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
