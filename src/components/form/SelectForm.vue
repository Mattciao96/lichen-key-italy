<template>
  <div v-for="group in filterData" :key="group.id">
    <div class="flex flex-col pb-2">
      <label class="pb-1" :for="group.id">{{ group.title }}:</label>
      <div class="relative flex md:mr-auto">
        <Dropdown
          :options="group.items"
          optionLabel="text"
          v-model="formStore.formData[group.id]"
          @change="(option) => updateSelectFormField(group.id, option.value)"
          :placeholder="group.title"
          :autoOptionFocus="true"
          append-to="self"
          class="!z-1 w-full md:w-[400px]"
          @show="toggleScroll"
          @hide="toggleScroll"
        />
        <ClearButtonForm :storeFieldId="group.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import ClearButtonForm from '@/components/form/ClearButtonForm.vue'
import { useFormStore } from '@/stores/formStore'
import { useScrollLock } from '@/composables/useScrollLock'

const { toggleScroll } = useScrollLock()

const formStore = useFormStore()

const props = defineProps({
  filterData: Array
})

const updateSelectFormField = (groupId: string, option: GroupItem) => {
  formStore.updateFormField(groupId, option)
}
</script>
