<template>
  <div>
    <AutoComplete
      v-model="formStore.formData['autocomplete']"
      :suggestions="filteredItems"
      :virtualScrollerOptions="{ itemSize: 38 }"
      @complete="search"
    />
    <button
      v-if="formStore.existsFormField('autocomplete')"
      @click="formStore.removeFormField('autocomplete')"
      class="absolute -top-6 right-0 m-2"
    >
      <i class="pi pi-times-circle text-surface-800"></i>
    </button>
  </div>
</template>

<script setup>
import AutoComplete from 'primevue/autocomplete'
import { computed, ref } from 'vue'
import { useFormStore } from '@/stores/formStore'
let formStore = useFormStore()

let items = ref([])
let filteredItems = computed(() => {
  if (!formStore.formData['autocomplete'] || formStore.formData['autocomplete'].length === 0) {
    return []
  }
  return items.value.filter((item) =>
    item.toLowerCase().includes(formStore.formData['autocomplete'].toLowerCase())
  )
})
let dataFetched = ref(false)

const search = async (event) => {
  if (!dataFetched.value && event.query.length > 0) {
    try {
      const response = await fetch('https://italic.units.it/api/v1/genera')
      const data = await response.json()

      items.value = data
      dataFetched.value = true
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }
}
</script>
