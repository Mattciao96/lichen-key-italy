<template>
  <div v-for="group in filterData" :key="group.id">
    <div>
      <Dropdown
        :options="group.items"
        optionLabel="text"
        v-model="formStore.formData[group.id]"
        @change="(option) => updateSelectFormField(group.id, option.value)"
        :placeholder="group.title"
        class="w-full md:w-[14rem]"
      />

      <button
        v-if="formStore.existsFormField(group.id)"
        @click="formStore.removeFormField(group.id)"
        class="absolute -top-6 right-0 m-2"
      >
        <i class="pi pi-times-circle text-surface-800"></i>
      </button>
    </div>
  </div>

  <button @click="formStore.resetForm()">Reset</button>
</template>

<script setup>
// !!! SUPER STO APPROCCIO
import Dropdown from 'primevue/dropdown'

import { useFormStore } from '@/stores/formStore'
import { rangeData } from '@/data/form-range.js'

const filterData = rangeData
const formStore = useFormStore()

const updateSelectFormField = (groupId, option) => {
  console.log({ groupId, option })
  formStore.updateFormField(groupId, option)
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
