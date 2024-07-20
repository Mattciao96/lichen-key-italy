<template>
  <LoadingSpinner v-if="keyStore.isLoading" />

  <div v-else-if="keyStore.error" class="error-message">
    {{ keyStore.error }}
  </div>

  <div v-else>
    <KeyTable :steps-list="keyStore.currentStepsList" />
  </div>
</template>

<script setup lang="ts">
import { useKeyStore } from '@/stores/keyStore'
import { useRoute } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import KeyTable from '@/components/key/KeyStepsTable.vue'
import { computed, onMounted } from 'vue'

const route = useRoute()
const keyStore = useKeyStore()
/*const stepList = computed(() => {
  console.log('ricalcolo')
  //return keyStore.getStepsListFromNodeId(0)
  return keyStore.getStepsListFromNodeId(route.params.nodeId)
})*/
onMounted(() => {
  keyStore.setStepsListFromNodeId(route.params.nodeId)
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
