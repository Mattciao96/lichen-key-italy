<template>
  <div v-for="group in selectDataArea" :key="group.id">
    <h2>{{ group.title }}</h2>
    <Dropdown
      :options="group.items"
      optionLabel="text"
      v-model="formStore.formData[group.id]"
      @change="(option) => updateSelectFormField(group.id, option.value)"
      :placeholder="group.title"
      class="w-full md:w-[14rem]"
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

  <button @click="resetForm">Reset</button>
</template>

<script setup>
import { ref, computed } from 'vue'
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

  reevaluateDropdowns()
}

const removeFormField = (groupId) => {
  formStore.removeFormField(groupId)
  reevaluateDropdowns()
}

const resetForm = () => {
  formStore.resetForm()
  reevaluateDropdowns()
}

const isDropdownDisabled = (group) => {
  if (!group.depend) return false

  let dependentValue = formStore.getFormField(group.depend.id)
  dependentValue = dependentValue ? dependentValue.value : ''

  console.log({ dependentValue })
  console.log(group.depend.item)
  return dependentValue !== group.depend.item
}

const reevaluateDropdowns = () => {
  // This function will trigger a re-render of the component
  // causing all dropdowns to re-evaluate their disabled state
  //formStore.$patch({}) // This triggers a state update without changing anything
}
</script>

<style scoped>
.dropdown-container {
  margin-bottom: 1rem;
}

button {
  margin-top: 20px;
}
</style>
