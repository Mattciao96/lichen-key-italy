<template>
  <div v-for="group in rangeData" :key="group.id">
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
            class="w-full md:w-[354px]"
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
import Dropdown from 'primevue/dropdown'
import { useFormStore } from '@/stores/formStore'
import { rangeData } from '@/data/form-range.js'

import { useScrollLock } from '@/composables/useScrollLock'
const { toggleScroll } = useScrollLock()

const formStore = useFormStore()

const updateSelectFormField = (groupId, option) => {
  formStore.updateFormField(groupId, option)
}
</script>
