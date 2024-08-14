<template>
  <TitleForm>Ecology</TitleForm>
  <div class="mb-2"><GroupFormSubstratum /></div>
  <div class="mb-2 space-y-2"><SelectRangeForm /></div>
  <div class="space-y-2"><SelectForm :filterData="selectData" /></div>
</template>

<script setup lang="ts">
import SelectForm from '@/components/form/SelectForm.vue'
import SelectRangeForm from '@/components/form/SelectRangeForm.vue'

import TitleForm from '@/components/form/TitleForm.vue'
import GroupFormSubstratum from '@/components/form/GroupFormSubstratum.vue'
import { selectData } from '@/data/form-select'
</script>
