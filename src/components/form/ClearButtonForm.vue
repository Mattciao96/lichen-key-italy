<template>
  <button
    v-if="formStore.existsFormField(storeFieldId)"
    @click="formStore.removeFormField(storeFieldId)"
    class="w-10 h-8 grid place-items-center bg-surface-0 absolute top-[3px] right-[3px] z-2"
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
