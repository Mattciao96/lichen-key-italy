<template>
  <table class="min-w-full bg-white border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="py-2 px-4 border-b">Couplet</th>
        <th class="py-2 px-4 border-b">Lead Text</th>
        <th class="py-2 px-4 border-b">Images</th>
        <th class="py-2 px-4 border-b">Lead to</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in stepsList" :key="item.leadId" class="hover:bg-gray-50">
        <td class="py-2 px-4 border-b" :id="`couplet${item.parentId}`">{{ item.parentId }}</td>
        <td class="py-2 px-4 border-b" v-html="item.leadText"></td>
        <td class="py-2 px-4 border-b">
          <img
            v-if="item.leadImage"
            :src="getImageUrl(item.leadImage)"
            loading="lazy"
            alt="Lead Image"
            class="w-96 h-20 object-contain"
          />
          <img
            v-if="item.speciesImage"
            :src="getSpeciesUrl(item.speciesImage)"
            alt="Species Image"
            loading="lazy"
            class="w-96 h-20 object-contain mt-1"
          />
        </td>
        <td class="py-2 px-4 border-b">
          <a :href="`#couplet${item.leadId}`">{{ item.leadId }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
//import { defineProps } from 'vue'
import placeholderImage from '@/assets/placeholder.svg'

interface KeyItem {
  leadId: number
  parentId: number
  leadText: string
  leadImage: string | null
  speciesImage: string | null
}

const props = defineProps<{
  stepsList: KeyItem[]
}>()

const getImageUrl = (imagePath: string) => `https://italic.units.it/flora/${imagePath}`

// url structure https://italic.units.it/flora/images/species/images/GlypholeciascabraPersMllArg1618826666.jpg
// replace images/species/images in imagePath with images/species/thumbnails
const getSpeciesUrl = (imagePath: string) => {
  if (!imagePath) {
    return placeholderImage
  }
  const path = imagePath.split('/')
  path.splice(2, 1, 'thumbnails')
  return `https://italic.units.it/flora/${path.join('/')}`
}
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}

/* Other styles... */
</style>
