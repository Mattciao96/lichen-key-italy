<template>
  <div v-for="group in filterData" :key="group.id">
    <div class="relative flex flex-col items-center gap-2 px-0 py-4 sm:px-4">
      <h3 class="text-sm sm:text-base" v-html="group.title"></h3>
      <div
        class="relative flex max-w-[348px] flex-wrap justify-center gap-2 sm:max-w-[488px] lg:max-w-[496px] lg:gap-4"
      >
        <label
          v-for="option in group.items"
          :key="option.value"
          :for="option.id"
          class="bg-popover hover:bg-accent hover:text-accent-foreground relative flex w-[170px] flex-col items-center justify-between gap-4 rounded-md border border-surface-400 p-1 text-sm font-medium leading-none shadow-sm hover:cursor-pointer hover:bg-surface-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-500/10 has-[:focus-visible]:ring-1 sm:w-[240px] sm:p-2"
        >
          <input
            class="absolute size-0 opacity-0"
            type="radio"
            :id="option.id"
            :name="group.id"
            :value="option.value"
            :checked="formStore.getFormField(group.id) === option.value"
            @change="updateForm(group.id, option.value)"
          />

          <img
            class="h-[38px] w-[150px] rounded-sm sm:h-[56px] sm:w-[224px]"
            :src="`/key-maker/radio-images/${option.image}`"
            :alt="option.text"
          />
          <span :class="`flex min-h-[38px] items-center justify-center text-center text-xs`">
            {{ option.text }}
          </span>

          <i
            v-if="formStore.getFormField(group.id) === option.value"
            class="pi pi-check-circle absolute right-1 top-1 text-primary-500"
          ></i>
        </label>
        <button
          v-if="formStore.existsFormField(group.id)"
          @click="formStore.removeFormField(group.id)"
          class="absolute -right-1 -top-9 m-2"
        >
          <i class="pi pi-times-circle text-surface-800"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/formStore'
import { radioData } from '@/data/form-radio'

const filterData = radioData
const formStore = useFormStore()

const updateForm = (groupId, value) => {
  formStore.updateFormField(groupId, value)
}
</script>
