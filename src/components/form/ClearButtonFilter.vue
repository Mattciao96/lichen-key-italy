<template>
  <button
    @click="removeFilterField(storeFieldId)"
    class="w-10 h-8 grid place-items-center absolute top-1/2 -translate-y-1/2 right-[0px] z-2"
  >
    <i class="pi pi-times-circle text-surface-800"></i>
  </button>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/formStore'

const props = defineProps<{
  storeFieldId: string
}>()
const formStore = useFormStore()

const removeFilterField = (groupId) => {
  console.log('Removing filter field:', groupId)
  formStore.removeFormField(groupId)
  const dependents = formStore.referenceData.filter(
    (group) => group.depend && group.depend.id === groupId
  )

  // If it does, remove these dependents from the store
  dependents.forEach((dependent) => {
    formStore.removeFormField(dependent.id)
  })
}
</script>
