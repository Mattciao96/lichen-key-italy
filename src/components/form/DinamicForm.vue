<template>
  <form @submit.prevent="submitForm">
    <div v-for="group in filterData" :key="group.id">
      <h3>{{ group.title }}</h3>
      <div v-if="!group.depend || formData[group.depend.id] === group.depend.item">
        <div v-for="item in group.items" :key="item.value">
          <label>
            <input
              type="radio"
              :name="group.id"
              :value="item.value"
              :checked="formData[group.id] === item.value"
              @change="updateForm(group.id, item.value)"
            />
            {{ item.text }}
          </label>
        </div>
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { useFormStore } from '@/stores/formStore'
import { radioData } from '@/data/form-radio.js'

const filterData = radioData
const formStore = useFormStore()

const formData = formStore.formData

const updateForm = (groupId, value) => {
  formStore.updateFormField(groupId, value)
}

const submitForm = () => {
  console.log('Form Data:', formStore.formData)
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
