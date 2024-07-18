<template>
  <div v-for="group in rarityData" :key="group.id">
    <label :for="group.id">{{ group.title }}:</label>
    <div class="pt-1 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div
        class="grid grid-cols-[50px_minmax(0,_1fr)] md:block"
        v-for="suffix in ['1', '2']"
        :key="`${group.id}${suffix}`"
      >
        <span v-if="suffix === '1'">From: </span>
        <span v-else>To: </span>
        <div class="relative inline-block">
          <Dropdown
            :options="group.items"
            optionLabel="text"
            v-model="formStore.formData[`${group.id}${suffix}`]"
            @change="(option) => updateSelectFormField(`${group.id}${suffix}`, option.value)"
            :placeholder="`${group.title} ${suffix === '1' ? 'min' : 'max'}`"
            :autoOptionFocus="true"
            append-to="self"
            class="w-full md:w-[354px]"
            :disabled="isDropdownDisabled(group)"
          />
          <button
            v-if="formStore.existsFormField(`${group.id}${suffix}`)"
            @click="formStore.removeFormField(`${group.id}${suffix}`)"
            class="w-10 h-8 grid place-items-center bg-surface-0 absolute top-[3px] right-[3px] z-2"
          >
            <i class="pi pi-times-circle text-surface-800"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useFormStore } from '@/stores/formStore'
import { rarityData } from '@/data/form-rarity'

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
