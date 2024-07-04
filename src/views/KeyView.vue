<template>
  <div>
    <h1>Key Records</h1>
    <div v-if="isLoading">Loading...</div>
    <ul v-else-if="displayRecords.length">
      <li v-for="record in displayRecords" :key="record">{{ record }}</li>
    </ul>
    <div v-else>No records found</div>
    <pre>{{ treeData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRecordStore } from '@/stores/recordStore'
import { useFormStore } from '@/stores/formStore'
import { useKeyStore } from '@/stores/keyStore'
import { useKeyRecordsQuery, useFullKeyQuery } from '@/composables/useKeyApi'
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const recordStore = useRecordStore()
const keyStore = useKeyStore()
const formStore = useFormStore()

const { tree } = storeToRefs(keyStore)
const error = ref(null)

const keyId = computed(() => route.query['key-id'] as string)

const { data: fullKeyData, isLoading: isFullKeyLoading, error: fullKeyError } = useFullKeyQuery()
const {
  data: keyRecordsData,
  isLoading: isKeyRecordsLoading,
  error: keyRecordsError
} = useKeyRecordsQuery(keyId.value)

const isLoading = computed(() => isFullKeyLoading.value || isKeyRecordsLoading.value)

onMounted(() => {
  formStore.resetForm()
})
</script>
