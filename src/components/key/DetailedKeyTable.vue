<template>
  <table class="w-full table-fixed rounded-md bg-white">
    <thead class="sticky -top-1 z-10 bg-white">
      <tr class="bg-gray-100">
        <th class="w-[10%] border-b p-1 sm:w-[5%]">Couplet</th>
        <th class="w-[80%] border-b p-1 sm:w-[85%] md:w-[70%]">Lead Text</th>
        <th class="w-[10%] border-b p-1 md:w-[25%]">Lead to</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in visibleSteps" :key="item.leadId">
        <tr :class="['hover:bg-gray-50', { 'border-b': !item.italicId }]">
          <td
            class="w-[10%] px-1 py-2 text-center font-semibold sm:w-[5%]"
            :id="`couplet${item.parentId}`"
          >
            {{ item.parentId }}
          </td>
          <td
            class="sm:w[85%] w-[80%] px-1 py-2 font-semibold tracking-wide md:w-[70%]"
            v-html="item.leadText"
          ></td>
          <td class="w-[10%] px-1 py-2 font-medium md:w-[25%]">
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
              :src="imageUrlToThumbNailUrl(item.speciesImage)"
              alt="Species Image"
              loading="lazy"
              class="h-auto max-h-[250px] min-h-[250px] w-full min-w-full rounded-md object-cover"
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
            <div class="flex items-center justify-center pb-1">
              <img
                v-if="item.speciesImage"
                :src="imageUrlToThumbNailUrl(item.speciesImage)"
                alt="Species Image"
                loading="lazy"
                class="h-auto max-h-[300px] min-h-[300px] w-[350px] min-w-[350px] max-w-full rounded-md object-cover"
              />
            </div>
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
import { imageUrlToThumbNailUrl } from '@/utils/imageUtils'
const props = defineProps<{
  visibleSteps: KeyLead[]
  taxonUrl: string
}>()

defineEmits(['scroll-to-anchor'])
</script>
