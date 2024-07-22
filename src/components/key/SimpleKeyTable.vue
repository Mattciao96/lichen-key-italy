<template>
  <table class="table-fixed w-full bg-white rounded-md">
    <thead class="sticky -top-1 bg-white z-10">
      <tr class="bg-gray-100">
        <th class="p-1 border-b w-[5%]">Couplet</th>
        <th class="p-1 border-b w-[85%] md:w-[70%]">Lead Text</th>
        <th class="p-1 border-b w-[10%] md:w-[25%]">Lead to</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in visibleSteps" :key="item.leadId">
        <tr :class="['hover:bg-gray-50 md:border-b ', { 'border-b': !item.italicId }]">
          <td class="p-1 w-[5%]" :id="`couplet${item.parentId}`">
            {{ item.parentId }}
          </td>
          <td class="p-1 w-[85%] md:w-[70%]" v-html="item.leadText"></td>
          <td class="p-1 w-[10%] md:w-[25%] font-medium">
            <a
              class="hidden md:block text-sm text-blue-600 hover:underline"
              v-if="item.italicId"
              :href="`${props.taxonUrl}${item.italicId}`"
              target="_blank"
            >
              {{ item.leadId }}
            </a>
            <a
              v-else
              @click.prevent="$emit('scroll-to-anchor', item.leadId)"
              href="#"
              class="text-sm text-blue-600 hover:underline"
              >{{ item.leadId }}</a
            >
          </td>
        </tr>
        <!--Mobile    -->
        <tr v-if="item.species_description" class="md:hidden hover:bg-gray-50">
          <td class="p-1 border-b text-right"></td>
          <td colspan="2" class="p-1 border-b">
            <a
              class="text-sm text-blue-600 hover:underline font-medium"
              v-if="item.italicId"
              :href="`${props.taxonUrl}${item.italicId}`"
              target="_blank"
            >
              {{ item.leadId }}
            </a>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { KeyLead } from '@/types'

const props = defineProps<{
  visibleSteps: KeyLead[]
  taxonUrl: string
}>()

defineEmits(['scroll-to-anchor'])
</script>
