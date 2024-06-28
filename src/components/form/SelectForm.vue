<template>
  <div v-for="group in filterData" :key="group.id">
    <!--    <div class="relative p-4 gap-2 flex flex-col items-center">
      <h3>{{ group.title }}</h3>
      <select class="border border-primary-700" @change="updateForm(group.id, $event.target.value)">
        <option disabled selected>Select a value</option>
        <option v-for="option in group.items" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>

      <button
        v-if="formStore.existsFormField(group.id)"
        @click="formStore.removeFormField(group.id)"
        class="absolute -top-6 right-0 m-2"
      >
        <i class="pi pi-times-circle text-surface-800"></i>
      </button>
    </div>-->
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
        class=" m-2"
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
import { selectData } from '@/data/form-select.js'

const filterData = selectData
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
