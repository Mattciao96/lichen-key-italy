<template>
  <div>
    <h1>Key Records</h1>
    <div v-if="isLoading">Loading...</div>
    <ul v-else-if="records.length">
      <li v-for="record in records" :key="record">{{ record }}</li>
    </ul>
    <div v-else>No records found</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRecordStore } from '@/stores/recordStore'
import { useKeyRecordsQuery } from '@/composables/useKeyApi'
import { computed, watchEffect } from 'vue'

const route = useRoute()
const recordStore = useRecordStore()

const keyId = computed(() => route.query['key-id'] as string)

watchEffect(() => {
  if (keyId.value) {
    recordStore.setKeyId(keyId.value)
  }
})

const { data, isLoading } = useKeyRecordsQuery(keyId)

const records = computed(() => {
  if (recordStore.records.length) {
    return recordStore.records
  }
  return data.value?.records || []
})
</script>
