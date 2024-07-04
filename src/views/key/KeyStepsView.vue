<template>
  <LoadingSpinner v-if="keyStore.isLoading" />

  <div v-else-if="keyStore.error" class="error-message">
    {{ keyStore.error }}
  </div>

  <div v-else>
    <div class="bg-red-300">{{ keyStore.keyId }}</div>
    <div class="bg-yellow-300">Rimasti: {{ keyStore.speciesCount }}</div>
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
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyStore = useKeyStore()
</script>

<style scoped>
/* You can remove the loading-related styles from here */
.error-message {
  color: red;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}

/* Other styles... */
</style>
