<template>
  <div class="bg-red-300">{{ keyId }}</div>
  <div class="bg-yellow-300">Rimasti: {{ count }}</div>
  <table class="min-w-full bg-white border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <!--        <th class="py-2 px-4 border-b">Couplet Number</th>-->
        <th class="py-2 px-4 border-b">Couplet</th>
        <th class="py-2 px-4 border-b">Lead Text</th>
        <!--        <th class="py-2 px-4 border-b">Lead To</th>-->

        <!--        <th class="py-2 px-4 border-b">Lead Species</th>-->
        <th class="py-2 px-4 border-b">Images</th>
        <th class="py-2 px-4 border-b">Lead to</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in lista" :key="item.leadId" class="hover:bg-gray-50">
        <!--        <td class="py-2 px-4 border-b">{{ item.coupletNumber }}</td>-->
        <td class="py-2 px-4 border-b" :id="`couplet${item.parentId}`">{{ item.parentId }}</td>

        <td class="py-2 px-4 border-b" v-html="item.leadText"></td>
        <!--        <td class="py-2 px-4 border-b">{{ item.leadTo }}</td>-->

        <!--        <td class="py-2 px-4 border-b">{{ item.leadSpecies }}</td>-->
        <td class="py-2 px-4 border-b">
          <img
            v-if="item.leadImage"
            :src="`https://italic.units.it/flora/${item.leadImage}`"
            loading="lazy"
            alt="Lead Image"
            class="w-12 h-12 object-cover"
          />
          <img
            v-if="item.speciesImage"
            :src="`https://italic.units.it/flora/${item.speciesImage}`"
            alt="Species Image"
            loading="lazy"
            class="w-12 h-12 object-cover mt-1"
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
// a very rough component that show how things should work

import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Tree from '@/utils/key-builder'

const lista = ref([])
const count = ref(0)
const route = useRoute()
const keyId = computed(() => route.query['key-id'] as string)
const savedTree = ref(null)

const fetchData = async () => {
  try {
    const [fullKeyResponse, recordsResponse] = await Promise.all([
      axios.get('https://italic.units.it/api/v1/full-key'),
      axios.post('https://italic.units.it/api/v1/key-records', { 'key-id': keyId.value })
    ])

    const key = fullKeyResponse.data
    console.log(key)
    const recordsToKeep = recordsResponse.data.records
    count.value = new Set([...recordsToKeep]).size

    // turn recordsToKeep into an array of numbers

    const newTree = new Tree()
    newTree.buildTree(key)
    newTree.prune3(recordsToKeep)

    console.log(newTree)
    savedTree.value = newTree

    let listaProvvisoria = newTree.getTreeAsListById()
    listaProvvisoria.shift()
    console.log(lista.value)
    count.value = new Set([...listaProvvisoria.map((item) => item.leadSpecies)]).size
    lista.value = listaProvvisoria
  } catch (e) {
    console.error('Error fetching data:', e)
  }
}

onMounted(() => {
  fetchData()
})
</script>
