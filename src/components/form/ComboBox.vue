<template>
  <label>{{ props.placeholder }}</label>
  <div class="relative">
    <Dropdown
      v-model="formStore.formData[props.storeFieldId]"
      :options="items"
      filter
      optionLabel="name"
      :placeholder="props.placeholder"
      class="w-full lg:w-[400px]"
      :virtualScrollerOptions="{ itemSize: 32 }"
      :autoFilterFocus="true"
      append-to="self"
      filterMatchMode="startsWith"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
    <button
      v-if="formStore.existsFormField(props.storeFieldId)"
      @click="formStore.removeFormField(props.storeFieldId)"
      class="absolute top-[8px] right-[40px] z-10"
    >
      <i class="pi pi-times-circle text-surface-800"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFormStore } from '@/stores/formStore'
import Dropdown from 'primevue/dropdown'

const props = defineProps({
  placeholder: String,
  storeFieldId: String,
  apiEndpoint: String
})
const formStore = useFormStore()

const items = ref([])

onMounted(async () => {
  try {
    const response = await fetch(props.apiEndpoint)
    const data = await response.json()
    console.log(data)
    items.value = data.map((item, index) => ({
      name: item,
      value: item
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
