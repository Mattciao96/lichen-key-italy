<template>
  <div class="max-w-4xl mx-auto">
    <div class="pb-6" v-for="group in selectDataArea" :key="group.id">
      <h2>{{ group.title }}</h2>
      <Dropdown
        :options="group.items"
        optionLabel="text"
        v-model="formStore.formData[group.id]"
        @change="(option) => updateSelectFormField(group.id, option.value)"
        :placeholder="group.title"
        append-to="self"
        class=""
        :disabled="isDropdownDisabled(group)"
      />
      <button
        v-if="formStore.existsFormField(group.id)"
        @click="removeFormField(group.id)"
        class="absolute -top-6 right-0 m-2"
      >
        <i class="pi pi-times-circle text-surface-800"></i>
      </button>
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
}

const resetForm = () => {
  formStore.resetForm()
}

const isDropdownDisabled = (group) => {
  if (!group.depend) return false

  let dependentValue = formStore.getFormField(group.depend.id)
  dependentValue = dependentValue ? dependentValue.value : ''

  return dependentValue !== group.depend.item
}
</script>
