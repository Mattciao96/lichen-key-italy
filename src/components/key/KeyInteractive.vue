<template>
  <div v-if="currentNode">
    <!--
    <p class="text-gray-600 mb-4">ID: {{ currentNode.data.leadId }}</p>

    <div class="mb-6">
      <p class="text-gray-700">
        Number of unique remaining species: {{ keyStore.currentSpeciesCount }}
      </p>
    </div>
-->

    <div v-if="currentNode.children.length > 0" class="space-y-4">
      <!--      <h3 class="text-xl font-semibold mb-2">Choose an option:</h3>-->
      <div class="flex flex-col space-y-4 items-center">
        <div
          v-for="child in currentNode.children"
          :key="child.data.leadId"
          :class="[
            'w-full max-w-2xl  pt-2 bg-white rounded-md shadow-sm overflow-hidden border border-gray-200',
            {
              'cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:border-green-700':
                !child.data.leadSpecies
            }
          ]"
          @click="!child.data.leadSpecies && navigateToNode(child)"
        >
          <div class="h-28 sm:h-36 overflow-hidden grid place-items-center">
            <img
              :src="getInteractiveImageUrl(child.data)"
              :alt="child.data.leadText"
              class="h-28 sm:h-36 w-auto object-contain rounded-md"
            />
          </div>
          <div class="p-2 min-h-20 sm:min-h-[78px] sm:h-[78px] flex items-center justify-center">
            <p class="text-sm text-gray-800 font-medium text-center">
              <span v-html="child.data.leadText"></span>
              <span v-if="child.data.leadSpecies" class="block">
                <a
                  class="font-medium text-blue-600 hover:underline"
                  :href="`https://italic.units.it/index.php?procedure=taxonpage&num=${child.data.italicId}`"
                  target="_blank"
                  >({{ child.data.leadSpecies }})</a
                >
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-lg font-semibold">
      <p>Not available</p>
    </div>
    <div class="w-full flex justify-center">
      <div class="mt-4 flex justify-between w-full max-w-2xl">
        <button
          v-if="!isRoot"
          @click="navigateToParent"
          class="min-w-20 px-3 py-2 text-sm font-medium rounded transition duration-150 ease-in-out border border-surface-300 bg-white text-surface-700 hover:bg-primary-500/30"
        >
          Back
        </button>
        <button
          v-if="!isRoot"
          @click="navigateToRoot"
          class="min-w-20 px-3 py-2 text-sm font-medium rounded transition duration-150 ease-in-out border border-surface-300 bg-white text-surface-700 hover:bg-primary-500/30"
        >
          Restart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import placeholderImage from '@/assets/placeholder.svg'

const props = defineProps({
  currentNode: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:currentNode'])

const keyStore = useKeyStore()

const isRoot = computed(() => {
  return props.currentNode && keyStore.keyTree.isRoot(props.currentNode)
})
function navigateToRoot() {
  emit('update:currentNode', keyStore.keyTree.root)
}

/*const uniqueSpeciesCount = computed(() => {
  if (!props.currentNode) return 0
  return keyStore.keyTree.getNumberOfUniqueLeaves(props.currentNode.data.leadId)
})*/

function navigateToNode(node) {
  emit('update:currentNode', node)
}

function navigateToParent() {
  if (props.currentNode && props.currentNode.data.parentId) {
    const parentNode = keyStore.keyTree.find(props.currentNode.data.parentId)
    if (parentNode) {
      emit('update:currentNode', parentNode)
    }
  }
}

const getInteractiveImageUrl = (nodeData) => {
  if (nodeData.speciesImage) {
    let imgPath = nodeData.speciesImage
    imgPath = imgPath.replace('images/species/images', 'images/species/thumbnails')
    return `https://italic.units.it/flora/${imgPath}`
  }
  if (nodeData.leadImage) {
    return `https://italic.units.it/flora/${nodeData.leadImage}`
  }
  return placeholderImage
}
</script>
