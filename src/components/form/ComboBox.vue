<template>
  <div class="flex flex-col pb-2">
    <label>{{ props.placeholder }}</label>
    <div class="relative flex pt-1 md:mr-auto">
      <Dropdown
        v-model="formStore.formData[props.storeFieldId]"
        :options="items"
        filter
        optionLabel="name"
        :placeholder="props.placeholder"
        class="w-full md:w-[400px]"
        :virtualScrollerOptions="{ itemSize: 32 }"
        :resetFilterOnHide="true"
        :autoFilterFocus="true"
        append-to="self"
        filterMatchMode="startsWith"
        :loading="isLoading"
        @show="handleShow"
        @hide="handleHide"
        @keydown.enter="handleEnterKey"
        @filter="handleFilter"
        ref="dropdownRef"
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
        class="z-2 absolute right-[3px] top-[7px] grid h-8 w-10 place-items-center bg-surface-0"
      >
        <i class="pi pi-times-circle text-surface-800"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormStore } from '@/stores/formStore'
import { useComboboxItemsQuery } from '@/composables/useKeyApi'
import Dropdown from 'primevue/dropdown'
import { useScrollLock } from '@/composables/useScrollLock'

const { toggleScroll } = useScrollLock()

const props = defineProps({
  placeholder: String,
  storeFieldId: String,
  apiEndpoint: String
})

const formStore = useFormStore()
const dropdownRef = ref(null)
const isDropdownOpen = ref(false)

const { data, isLoading, error } = useComboboxItemsQuery(props.placeholder, props.apiEndpoint)

const items = computed(() => data.value || [])
const filterValue = ref('')

// You can handle the error state if needed
if (error.value) {
  console.error('Error fetching combobox items:', error.value)
}

const handleFilter = (event: { value: string }) => {
  filterValue.value = event.value
}

const handleShow = () => {
  isDropdownOpen.value = true
  toggleScroll()
}

const handleHide = () => {
  isDropdownOpen.value = false
  toggleScroll()
}

const handleEnterKey = (event: KeyboardEvent) => {
  if (
    isDropdownOpen.value &&
    dropdownRef.value &&
    dropdownRef.value.$el.querySelector('.p-virtualscroller-content')
  ) {
    event.preventDefault()
    const filteredItems = items.value.filter((item) =>
      item.name.toLowerCase().startsWith(filterValue.value.toLowerCase())
    )
    const firstOption = filteredItems[0]
    if (firstOption) {
      formStore.formData[props.storeFieldId] = firstOption
      dropdownRef.value.hide()
    }
  }
}
</script>
