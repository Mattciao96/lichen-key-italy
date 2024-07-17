<template>
  <table class="w-full bg-white border border-gray-300">
    <thead class="sticky top-0 bg-white z-10">
      <tr class="bg-gray-100">
        <th class="p-1 border-b w-[10%]">Couplet</th>
        <th class="p-1 border-b w-[70%]">Lead Text</th>
        <th class="p-1 border-b w-[20%]">Lead to</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in visibleSteps" :key="item.leadId">
        <tr class="hover:bg-gray-50">
          <td class="p-1 border-b w-[10%]" :id="`couplet${item.parentId}`">
            {{ item.parentId }}
          </td>
          <td class="p-1 border-b w-[70%]" v-html="item.leadText"></td>
          <td class="p-1 border-b w-[20%]">
            <a
              @click.prevent="$emit('scroll-to-anchor', item.leadId)"
              href="#"
              class="text-blue-500 hover:underline"
              >{{ item.leadId }}</a
            >
          </td>
        </tr>
        <tr v-if="item.species_description" class="hover:bg-gray-50">
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
              class="w-full h-auto object-contain rounded-sm"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import placeholderImage from '@/assets/placeholder.svg'

interface KeyItem {
  leadId: number
  parentId: number
  leadText: string
  leadImage: string | null
  speciesImage: string | null
  species_description: string | null
}

const props = defineProps<{
  visibleSteps: KeyItem[]
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
