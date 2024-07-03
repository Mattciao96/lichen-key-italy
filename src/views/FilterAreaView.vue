<template>
  <FormLayout>
    <div>area</div>
    <div class="space-y-4"><AreaForm /></div>
    <div class="space-y-4"><SelectRarityForm /></div>
  </FormLayout>
</template>

<script setup lang="ts">
//import FormStepper from '@/components/form/FormStepper.vue'
import FormLayout from '@/layouts/FormLayout.vue'
import AreaForm from '@/components/form/AreaForm.vue'
import SelectRarityForm from '@/components/form/SelectRarityForm.vue'
</script>
