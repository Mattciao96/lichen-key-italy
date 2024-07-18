<template>
  <FormLayout>
    <TitleForm>Ecology Filter</TitleForm>
    <ComboBox
      placeholder="Genus"
      api-endpoint="https://italic.units.it/api/v1/genera"
      store-field-id="genus"
    />
    <ComboBox
      placeholder="Family"
      api-endpoint="https://italic.units.it/api/v1/families"
      store-field-id="family"
    />

    <div class="space-y-2 mb-2"><SelectForm /></div>
    <div class="space-y-2"><SelectRangeForm /></div>
  </FormLayout>
</template>

<script setup lang="ts">
import FormLayout from '@/layouts/FormLayout.vue'

import SelectForm from '@/components/form/SelectForm.vue'
import SelectRangeForm from '@/components/form/SelectRangeForm.vue'
import ComboBox from '@/components/form/ComboBox.vue'
import TitleForm from '@/components/form/TitleForm.vue'
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
</script>
