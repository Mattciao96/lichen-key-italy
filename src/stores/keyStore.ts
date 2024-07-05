// src/stores/useKeyStore.ts
// !!! TODO remove the toot in list in tree class
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

import Tree from '@/utils/key-builder'

interface KeyItem {
  leadId: number
  parentId: number
  leadText: string
  leadImage: string | null
  speciesImage: string | null
  leadSpecies: string | null
}

interface SpeciesInfo {
  name: string
  image: string | null
}

interface FullKey {
  keyData: KeyItem[]
}
interface OnlyKey {
  keyData: KeyItem[]
}

export const useKeyStore = defineStore('key', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const keyId = ref<string | null>(null)
  const recordsList = ref<number[]>([])
  const fullKey = ref<FullKey | null>(null)
  //const fullKeyLastFetched = ref<number | null>(null)
  const keyTree = ref<Tree | null>(null)
  const stepsList = ref<KeyItem[]>([])

  //const speciesCount = computed(() => new Set(stepsList.value.map((item) => item.leadSpecies)).size)
  const speciesList = ref<SpeciesInfo[] | null>(null)
  const uniqueSpeciesWithImages = computed(() => getUniqueSpeciesWithImages())
  //const speciesCount = 0
  const speciesCount = computed(() => uniqueSpeciesWithImages.value.length)

  const setKeyId = (keyUUID: string) => {
    if (keyId.value !== keyUUID) {
      resetAllExceptKey()
    }
    keyId.value = keyUUID
  }

  const fetchFullKey = async (): Promise<FullKey> => {
    const storedKey = localStorage.getItem('fullKey')
    const lastFetchTime = localStorage.getItem('lastFullKeyFetch')
    const currentTime = new Date().getTime()

    // Check if a month has passed since the last fetch
    if (
      storedKey &&
      lastFetchTime &&
      currentTime - parseInt(lastFetchTime) < 30 * 24 * 60 * 60 * 1000
    ) {
      return JSON.parse(storedKey)
    }

    // Fetch new data if not in localStorage or a month has passed
    const response = await axios.get<FullKey>('https://italic.units.it/api/v1/full-key')

    // Store the new data and fetch time
    localStorage.setItem('fullKey', JSON.stringify(response.data.keyData))
    localStorage.setItem('lastFullKeyFetch', currentTime.toString())

    return response.data.keyData
  }
  const fetchRecords = async (id: string): Promise<number[]> => {
    const response = await axios.post<{ records: number[] }>(
      'https://italic.units.it/api/v1/key-records',
      { 'key-id': id }
    )
    return response.data.records
  }

  const buildKeyTree = (key: OnlyKey, records: number[]): Tree => {
    const tree = new Tree()
    tree.buildTree(key)
    tree.prune3(records)
    return tree
  }

  const fetchData = async () => {
    if (!keyId.value) {
      error.value = 'Key ID is not set'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const [retrievedFullKey, retrievedRecords] = await Promise.all([
        fetchFullKey(),
        fetchRecords(keyId.value)
      ])

      const newTree = buildKeyTree(retrievedFullKey, retrievedRecords)
      const stepsListFromTree = newTree.getTreeAsListById() as KeyItem[]
      stepsListFromTree.shift() // Remove the first item

      fullKey.value = retrievedFullKey
      recordsList.value = retrievedRecords
      keyTree.value = newTree
      stepsList.value = stepsListFromTree

      speciesList.value = getUniqueSpeciesWithImages()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  const getUniqueSpeciesWithImages = () => {
    // If speciesList is already computed, return it
    if (speciesList.value !== null) {
      return speciesList.value
    }

    const speciesMap = new Map<string, SpeciesInfo>()

    stepsList.value.forEach((item) => {
      if (item.leadSpecies !== null) {
        speciesMap.set(item.leadSpecies, {
          name: item.leadSpecies,
          image: item.speciesImage
        })
      }
    })

    const computedSpeciesList = Array.from(speciesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    // Store the computed list
    return computedSpeciesList
  }

  // for interactive key
  const getStepsListFromNodeId = (nodeId) => {
    const tree = keyTree.value
    if (!tree) {
      return []
    }

    const stepsList = tree.getTreeAsListById(nodeId)
    if (!stepsList) {
      return []
    }

    stepsList.shift()
    return stepsList
  }

  const resetAllExceptKey = () => {
    isLoading.value = false
    error.value = null
    recordsList.value = []
    fullKey.value = null
    keyTree.value = null
    stepsList.value = []
    speciesList.value = null
  }
  const resetStore = () => {
    isLoading.value = false
    error.value = null
    recordsList.value = []
    fullKey.value = null
    keyTree.value = null
    stepsList.value = []
    speciesList.value = null
    keyId.value = null
  }

  return {
    keyId,
    isLoading,
    error,
    recordsList,
    fullKey,
    speciesCount,
    keyTree,
    stepsList,
    setKeyId,
    fetchData,
    getUniqueSpeciesWithImages,
    getStepsListFromNodeId,
    uniqueSpeciesWithImages,
    resetStore
  }
})
