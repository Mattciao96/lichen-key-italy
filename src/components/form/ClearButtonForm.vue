<template>
  <button
    v-if="formStore.existsFormField(storeFieldId)"
    @click="formStore.removeFormField(storeFieldId)"
    class="z-2 absolute right-[3px] top-[3px] grid h-8 w-10 place-items-center bg-surface-0"
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
