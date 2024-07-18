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
          class="w-full md:w-[400px] !z-1"
          :disabled="isDropdownDisabled(group)"
        />
        <button
          v-if="formStore.existsFormField(group.id)"
          @click="removeFormField(group.id)"
          class="w-10 h-8 grid place-items-center bg-surface-0 absolute top-[3px] right-[3px] z-2"
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

const formStore = useFormStore()

const updateSelectFormField = (groupId, option) => {
  console.log({ groupId, option })
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
