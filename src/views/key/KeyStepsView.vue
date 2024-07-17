<template>
  <LoadingSpinner v-if="keyStore.isLoading" />

  <div v-else-if="keyStore.error" class="error-message">
    {{ keyStore.error }}
  </div>

  <div v-else>
    <KeyTable :steps-list="stepList" />
  </div>
</template>

<script setup lang="ts">
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import KeyTable from '@/components/key/KeyStepsTable.vue'
import { computed } from 'vue'

const keyStore = useKeyStore()
const stepList = computed(() => {
  return keyStore.getStepsListFromNodeId(0)
})
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
