<template>
  <div class="">
    <Dropdown
      v-model="formStore.formData[props.storeFieldId]"
      :options="countries"
      filter
      optionLabel="name"
      :placeholder="props.placeholder"
      class="w-full md:w-[14rem]"
      :virtualScrollerOptions="{ itemSize: 32 }"
      :autoFilterFocus="true"
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
  </div>
  <button
    v-if="formStore.existsFormField(props.storeFieldId)"
    @click="formStore.removeFormField(props.storeFieldId)"
    class="m-2"
  >
    <i class="pi pi-times-circle text-surface-800"></i>
  </button>
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

const countries = ref([])

onMounted(async () => {
  try {
    const response = await fetch(props.apiEndpoint)
    const data = await response.json()
    console.log(data)
    countries.value = data.map((item, index) => ({
      name: item,
      value: index
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
