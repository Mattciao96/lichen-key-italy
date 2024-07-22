<template>
  <TitleForm>General Filter</TitleForm>
  <div class="space-y-4"><AreaForm /></div>
  <div class="space-y-4 my-4"><SelectRarityForm /></div>
  <div class="space-y-2 my-4"><SelectForm :filterData="lichenizedData" /></div>
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
</template>

<script setup lang="ts">
import TitleForm from '@/components/form/TitleForm.vue'
import AreaForm from '@/components/form/AreaForm.vue'
import ComboBox from '@/components/form/ComboBox.vue'
import SelectRarityForm from '@/components/form/SelectRarityForm.vue'
import { lichenizedData } from '@/data/form-lichenized'
import SelectForm from '@/components/form/SelectForm.vue'
</script>
