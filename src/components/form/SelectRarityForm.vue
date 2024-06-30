<template>
  <div v-for="group in rarityData" :key="group.id">
    <h2>{{ group.title }}</h2>
    <div class="grid grid-cols-2">
      <div v-for="suffix in ['1', '2']" :key="`${group.id}${suffix}`">
        <span v-if="suffix === '1'">From: </span>
        <span v-else>To: </span>
        <Dropdown
          :options="group.items"
          optionLabel="text"
          v-model="formStore.formData[`${group.id}${suffix}`]"
          @change="(option) => updateSelectFormField(`${group.id}${suffix}`, option.value)"
          :placeholder="`${group.title} ${suffix === '1' ? 'min' : 'max'}`"
          :autoOptionFocus="true"
          class="w-full md:w-[14rem]"
          :disabled="isDropdownDisabled(group)"
        />
        <button
          v-if="formStore.existsFormField(`${group.id}${suffix}`)"
          @click="formStore.removeFormField(`${group.id}${suffix}`)"
          class="absolute -top-6 right-0 m-2"
        >
          <i class="pi pi-times-circle text-surface-800"></i>
        </button>
      </div>
    </div>
  </div>

  <button @click="formStore.resetForm()">Reset</button>
</template>

<script setup>
import { nextTick } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useFormStore } from '@/stores/formStore'
import { rarityData } from '@/data/form-rarity.js'

const formStore = useFormStore()

const updateSelectFormField = (groupId, option) => {
  formStore.updateFormField(groupId, option)
}

const isDropdownDisabled = (group) => {
  if (!group.depend) return false

  let dependentValue = formStore.getFormField(group.depend.id)
  dependentValue = dependentValue ? dependentValue.value : ''

  console.log({ coso1: dependentValue, coso2: group })
  const isDisabled = dependentValue !== group.depend.item

  // If the dropdown is disabled, remove the corresponding field from the store
  console.log({ isDisabled })

  if (isDisabled) {
    nextTick(() => {
      formStore.removeFormField(`${group.id}1`)
      formStore.removeFormField(`${group.id}2`)
    })
  }

  return isDisabled
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label {
  display: flex;
  align-items: center;
}

input[type='radio'] {
  margin-right: 10px;
}

button {
  margin-top: 20px;
}
</style>
