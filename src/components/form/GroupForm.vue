<template>
  <div v-for="group in filterData" :key="group.id">
    <div class="relative py-4 px-0 sm:px-4 gap-2 flex flex-col items-center">
      <h3>{{ group.title }}</h3>
      <div class="relative flex gap-2 lg:gap-4 justify-center flex-wrap">
        <label
          v-for="option in group.items"
          :key="option.id"
          :for="option.id"
          class="relative text-sm font-medium leading-none w-[170px] sm:w-[240px] flex flex-col gap-4 items-center justify-between rounded-lg border-2 border-surface-300 bg-popover p-1 sm:p-2 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground has-[:focus-visible]:ring-1 hover:bg-surface-50 has-[:checked]:border-primary-500"
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
            class="w-[150px] h-[38px] sm:w-[224px] sm:h-[56px] rounded-sm"
            :src="`/key-test/radio-images/${option.image}`"
            :alt="option.text"
          />
          <span
            :class="`text-xs h-[${group.id === '27' ? '48' : '42'}px] flex justify-center items-center text-center`"
            >{{ option.text }}</span
          >

          <i
            v-if="formStore.getFormField(group.id) === option.value"
            class="pi pi-check-circle absolute top-1 right-1 text-primary-500"
          ></i>
        </label>
        <button
          v-if="formStore.existsFormField(group.id)"
          @click="formStore.removeFormField(group.id)"
          class="absolute -top-12 -right-1 m-2"
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
