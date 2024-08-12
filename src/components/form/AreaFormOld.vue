<template>
  <div v-for="group in selectDataArea" :key="group.id">
    <div class="flex flex-col pb-2">
      <label class="pb-1" :for="group.id">{{ group.title }}:</label>
      <div class="relative flex md:mr-auto">
        <Dropdown
          :options="group.items"
          optionLabel="text"
          v-model="formStore.formData[group.id]"
          @change="(option) => updateSelectFormField(group.id, option.value)"
          :placeholder="group.title"
          :autoOptionFocus="true"
          append-to="self"
          class="!z-1 w-full md:w-[400px]"
          :disabled="isDropdownDisabled(group)"
          @show="toggleScroll"
          @hide="toggleScroll"
        />
        <button
          v-if="formStore.existsFormField(group.id)"
          @click="removeFormField(group.id)"
          class="z-2 absolute right-[3px] top-[3px] grid h-8 w-10 place-items-center bg-surface-0"
        >
          <i class="pi pi-times-circle text-surface-800"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { useFormStore } from '@/stores/formStore'
import { selectDataArea } from '@/data/form-area'

import { useScrollLock } from '@/composables/useScrollLock'
const { toggleScroll } = useScrollLock()

const formStore = useFormStore()

const updateSelectFormField = (groupId, option) => {
  formStore.updateFormField(groupId, option)

  // Check if the updated field has any dependents
  const dependents = selectDataArea.filter((group) => group.depend && group.depend.id === groupId)

  // If it does, remove these dependents from the store
  dependents.forEach((dependent) => {
    formStore.removeFormField(dependent.id)
  })
}

const removeFormField = (groupId) => {
  formStore.removeFormField(groupId)
  const dependents = selectDataArea.filter((group) => group.depend && group.depend.id === groupId)

  // If it does, remove these dependents from the store
  dependents.forEach((dependent) => {
    formStore.removeFormField(dependent.id)
  })
}

const isDropdownDisabled = (group) => {
  if (!group.depend) return false

  let dependentValue = formStore.getFormField(group.depend.id)
  dependentValue = dependentValue ? dependentValue.value : ''

  return dependentValue !== group.depend.item
}
</script>
