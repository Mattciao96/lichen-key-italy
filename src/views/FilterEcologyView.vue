<template>
  <FormStepper />
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
  <SelectForm />
  <SelectRangeForm />
</template>

<script setup lang="ts">
import FormStepper from '@/components/form/FormStepper.vue'
import SelectForm from '@/components/form/SelectForm.vue'
import SelectRangeForm from '@/components/form/SelectRangeForm.vue'
import ComboBox from '@/components/form/ComboBox.vue'
</script>
