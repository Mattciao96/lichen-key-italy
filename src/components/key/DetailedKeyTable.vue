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
        <tr :class="['hover:bg-gray-50 ', { 'border-b': !item.italicId }]">
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
        <!-- default       -->
        <tr v-if="item.species_description" class="hidden lg:table-row hover:bg-gray-50">
          <td class="p-1 border-b w-[2%]"></td>
          <td class="p-1 border-b w-[65%]">
            <span class="text-xs"><b>Description:</b></span>
            <span class="text-xs" v-html="item.species_description"> </span>
          </td>
          <td class="p-1 border-b w-[10%]">
            <img
              v-if="item.speciesImage"
              :src="getSpeciesUrl(item.speciesImage)"
              alt="Species Image"
              loading="lazy"
              class="max-w-full lg:w-full lg:h-auto object-contain rounded-sm"
            />
          </td>
        </tr>
        <!--mobile-->
        <tr v-if="item.species_description" class="md:hidden hover:bg-gray-50">
          <td colspan="3" class="p-1 border-b text-right">
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
        <tr v-if="item.species_description" class="lg:hidden hover:bg-gray-50">
          <td colspan="3" class="p-1 border-b">
            <img
              v-if="item.speciesImage"
              :src="getSpeciesUrl(item.speciesImage)"
              alt="Species Image"
              loading="lazy"
              class="w-full h-auto object-contain rounded-sm"
            />
            <span class="text-xs"><b>Description:</b></span>
            <span class="text-xs" v-html="item.species_description"> </span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { KeyLead } from '@/types'
import placeholderImage from '@/assets/placeholder.svg'

const props = defineProps<{
  visibleSteps: KeyLead[]
  taxonUrl: string
}>()

defineEmits(['scroll-to-anchor'])

const getSpeciesUrl = (imagePath: string | null) => {
  if (!imagePath) {
    return placeholderImage
  }
  const path = imagePath.split('/')
  path.splice(2, 1, 'thumbnails')
  return `https://italic.units.it/flora/${path.join('/')}`
}
</script>
