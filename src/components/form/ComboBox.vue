<template>
  <div class="flex flex-col pb-2">
    <label>{{ props.placeholder }}</label>
    <div class="pt-1 relative flex md:mr-auto">
      <Dropdown
        v-model="formStore.formData[props.storeFieldId]"
        :options="items"
        filter
        optionLabel="name"
        :placeholder="props.placeholder"
        class="w-full md:w-[400px]"
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
        class="bg-surface-0 absolute top-[12px] right-[16px] z-2"
      >
        <i class="pi pi-times-circle text-surface-800"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
