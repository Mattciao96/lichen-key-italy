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
      <div class="flex flex-col space-y-4">
        <div
          v-for="child in currentNode.children"
          :key="child.data.leadId"
          :class="[
            'bg-white rounded-md shadow-md overflow-hidden border border-gray-200',
            {
              'cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:border-green-700':
                !child.data.leadSpecies
            }
          ]"
          @click="!child.data.leadSpecies && navigateToNode(child)"
        >
          <div class="h-40 overflow-hidden grid place-items-center">
            <img
              :src="getInteractiveImageUrl(child.data)"
              :alt="child.data.leadText"
              class="max-h-40 w-auto object-contain rounded-md"
            />
          </div>
          <div class="p-4">
            <p class="text-gray-800 font-medium text-center">
              {{ child.data.leadText }}
              <span v-if="child.data.leadSpecies" class="text-gray-600 italic">
                ({{ child.data.leadSpecies }})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
      <p class="text-yellow-700">This is a leaf node (no children).</p>
    </div>

    <button
      v-if="!isRoot"
      @click="navigateToParent"
      class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      Go to Parent
    </button>
    <button
      v-if="!isRoot"
      @click="navigateToRoot"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      Return to Root
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
