<template>
  <table class="w-full table-fixed rounded-md bg-white">
    <thead class="sticky -top-1 z-10 bg-white">
      <tr class="bg-gray-100">
        <th class="w-[5%] border-b p-1">Couplet</th>
        <th class="w-[85%] border-b p-1 md:w-[70%]">Lead Text</th>
        <th class="w-[10%] border-b p-1 md:w-[25%]">Lead to</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in visibleSteps" :key="item.leadId">
        <tr :class="['hover:bg-gray-50', { 'border-b': !item.italicId }]">
          <td class="w-[5%] p-1" :id="`couplet${item.parentId}`">
            {{ item.parentId }}
          </td>
          <td class="w-[85%] p-1 md:w-[70%]" v-html="item.leadText"></td>
          <td class="w-[10%] p-1 font-medium md:w-[25%]">
            <a
              class="hidden text-sm text-blue-600 hover:underline md:block"
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
        <tr v-if="item.species_description" class="hidden hover:bg-gray-50 lg:table-row">
          <td class="w-[2%] border-b p-1"></td>
          <td class="w-[65%] border-b p-1">
            <span class="text-xs"><b>Description:</b></span>
            <span class="text-xs" v-html="item.species_description"> </span>
          </td>
          <td class="w-[10%] border-b p-1">
            <img
              v-if="item.speciesImage"
              :src="getSpeciesUrl(item.speciesImage)"
              alt="Species Image"
              loading="lazy"
              class="max-w-full rounded-sm object-contain lg:h-auto lg:w-full"
            />
          </td>
        </tr>
        <!--mobile-->
        <tr v-if="item.species_description" class="hover:bg-gray-50 md:hidden">
          <td colspan="3" class="border-b p-1 text-right">
            <a
              class="text-sm font-medium text-blue-600 hover:underline"
              v-if="item.italicId"
              :href="`${props.taxonUrl}${item.italicId}`"
              target="_blank"
            >
              {{ item.leadId }}
            </a>
          </td>
        </tr>
        <tr v-if="item.species_description" class="hover:bg-gray-50 lg:hidden">
          <td colspan="3" class="border-b p-1">
            <img
              v-if="item.speciesImage"
              :src="getSpeciesUrl(item.speciesImage)"
              alt="Species Image"
              loading="lazy"
              class="h-auto w-full rounded-sm object-contain"
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
