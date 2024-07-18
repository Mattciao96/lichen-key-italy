<template>
  <button
    v-if="formStore.existsFormField(storeFieldId)"
    @click="formStore.removeFormField(storeFieldId)"
    class="bg-surface-0 absolute top-[8px] right-[16px] z-2"
  >
    <i class="pi pi-times-circle text-surface-800"></i>
  </button>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/formStore' // Adjust the import path as needed

const props = defineProps<{
  storeFieldId: string
}>()

const formStore = useFormStore()
</script>
