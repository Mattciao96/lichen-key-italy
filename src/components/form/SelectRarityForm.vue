<template>
  <div v-for="group in rarityData" :key="group.id">
    <label :for="group.id">{{ group.title }}:</label>
    <div class="grid grid-cols-1 gap-2 pt-1 md:grid-cols-2">
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
            class="w-full md:w-[320px] lg:w-[354px]"
            :disabled="isDropdownDisabled(group)"
            @show="toggleScroll"
            @hide="toggleScroll"
          />
          <button
            v-if="formStore.existsFormField(`${group.id}${suffix}`)"
            @click="formStore.removeFormField(`${group.id}${suffix}`)"
            class="z-2 absolute right-[3px] top-[3px] grid h-8 w-10 place-items-center bg-surface-0"
          >
            <i class="pi pi-times-circle text-surface-800"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useFormStore } from '@/stores/formStore'
import { rarityData } from '@/data/form-rarity'

import { useScrollLock } from '@/composables/useScrollLock'
const { toggleScroll } = useScrollLock()

const formStore = useFormStore()

const updateSelectFormField = (groupId, option) => {
  formStore.updateFormField(groupId, option)
}

const isDropdownDisabled = (group) => {
  if (!group.depend) return false

  let dependentValue = formStore.getFormField(group.depend.id)
  dependentValue = dependentValue ? dependentValue.value : ''

  //console.log({ coso1: dependentValue, coso2: group })
  let isDisabled = true

  // selected acts as a keyword to disable the dropdown if the related field is not selected
  if (group.depend.item === 'SELECTED') {
    isDisabled = dependentValue === ''
  } else {
    isDisabled = dependentValue === group.depend.item
  }
  // If the dropdown is disabled, remove the corresponding field from the store

  if (isDisabled) {
    nextTick(() => {
      formStore.removeFormField(`${group.id}1`)
      formStore.removeFormField(`${group.id}2`)
    })
  }

  return isDisabled
}
</script>
