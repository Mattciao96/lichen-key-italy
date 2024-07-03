<template>
  <FormLayout>
    <div>ecology</div>
    <ComboBox
      placeholder="genus"
      api-endpoint="https://italic.units.it/api/v1/genera"
      store-field-id="genus"
    />
    <ComboBox
      placeholder="family"
      api-endpoint="https://italic.units.it/api/v1/families"
      store-field-id="family"
    />

    <div class="space-y-4"><SelectForm /></div>
    <div class="space-y-4"><SelectRangeForm /></div>

    <button @click="console.log(formStore.getFormValuesForSubmission())">See val</button>
  </FormLayout>
</template>

<script setup lang="ts">
import FormLayout from '@/layouts/FormLayout.vue'

import SelectForm from '@/components/form/SelectForm.vue'
import SelectRangeForm from '@/components/form/SelectRangeForm.vue'
import ComboBox from '@/components/form/ComboBox.vue'

import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
</script>
