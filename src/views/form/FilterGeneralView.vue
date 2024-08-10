<template>
  <TitleForm>General Filter</TitleForm>
  <div class="space-y-4"><AreaForm /></div>
  <div class="my-4 space-y-4"><SelectRarityForm /></div>
  <div class="my-4 space-y-2"><SelectForm :filterData="lichenizedData" /></div>
  <ComboBox placeholder="Genus" :api-endpoint="endpoints.generaList" store-field-id="genus" />
  <ComboBox placeholder="Family" :api-endpoint="endpoints.familiesList" store-field-id="family" />
</template>

<script setup lang="ts">
import { endpoints } from '@/config/endpoints'
import TitleForm from '@/components/form/TitleForm.vue'
import AreaForm from '@/components/form/AreaForm.vue'
import ComboBox from '@/components/form/ComboBox.vue'
import SelectRarityForm from '@/components/form/SelectRarityForm.vue'
import { lichenizedData } from '@/data/form-lichenized'
import SelectForm from '@/components/form/SelectForm.vue'
</script>
