// src/stores/useKeyStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { openDB } from 'idb'

import Tree from '@/utils/key-builder'
import type { KeyLead } from '@/types'

interface KeyItem {
  leadId: number
  parentId: number
  leadText: string
  leadImage: string | null
  speciesImage: string | null
  leadSpecies: string | null
  leadRecordId: number
}

interface SpeciesInfo {
  name: string
  image: string | null
  italicId: number | null
}

interface FullKey {
  keyData: KeyItem[]
}

interface KeyDB {
  fullKey: {
    key: string
    value: FullKey
  }
  lastFetch: {
    key: string
    value: number
  }
}

const dbPromise = openDB<KeyDB>('keyStore', 1, {
  upgrade(db) {
    db.createObjectStore('fullKey')
    db.createObjectStore('lastFetch')
  }
})

export const useKeyStore = defineStore('key', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const keyId = ref<string | null>(null)

  const rootLeadId = ref<string | null>(null)
  const currentLeadId = ref<string | null>(null)

  const recordsList = ref<number[]>([])
  const fullKey = ref<FullKey | null>(null)
  const keyTree = ref<Tree | null>(null)
  const stepsList = ref<KeyItem[]>([])

  const speciesList = ref<SpeciesInfo[] | null>(null)
  const uniqueSpeciesWithImages = computed(() => getUniqueSpeciesWithImages())
  //const speciesCount = computed(() => uniqueSpeciesWithImages.value.length)
  const speciesCount = computed(() => {
    if (keyId.value === 'no-data') {
      return 0
    }
    if (!keyTree.value) {
      return 0
    }
    if (uniqueSpeciesWithImages.value.length === 1) {
      return 1
    }
    return keyTree.value.getNumberOfUniqueLeaves(1)
  })
  const nodeIdOfCurrentSteps = ref<string | null>(null)
  const nodeIdOfCurrentSpecies = ref<string | null>(null)
  const nodeIdOfCurrentSpeciesImages = ref<string | null>(null)
  const nodeIdOfCurrentSpeciesWithRecord = ref<string | null>(null)
  const isCurrentNodeValid = ref(true)
  const currentStepsList = ref<KeyItem[]>([])
  const currentUniqueSpeciesWithImages = ref<SpeciesInfo[]>([])
  const currentSpeciesCount = computed(() => {
    if (keyId.value === 'no-data') {
      return 0
    }
    if (!keyTree.value) {
      return null
    }
    if (speciesCount.value === 1) {
      return 1
    }
    return keyTree.value.getNumberOfUniqueLeaves(parseInt(currentLeadId.value))
  })

  const currentUniqueSpeciesList = ref<{ name: string; records: number[] }[]>([])
  const currentUniqueSpeciesWithRecords = ref<{ name: string; records: number[] }[]>([])

  const setKeyId = (keyUUID: string) => {
    if (keyId.value !== keyUUID) {
      resetAllExceptKey()
    }
    keyId.value = keyUUID
  }

  const setRootLeadId = (leadId: string) => {
    rootLeadId.value = leadId
    currentLeadId.value = leadId
  }

  const setCurrentLeadId = (leadId: string) => {
    currentLeadId.value = leadId
  }

  const resetCurrentLeadIdToRoot = () => {
    currentLeadId.value = rootLeadId.value
  }

  const fetchFullKey = async (): Promise<FullKey> => {
    const db = await dbPromise
    const storedKey = await db.get('fullKey', 'currentKey')
    const lastFetchTime = await db.get('lastFetch', 'fullKeyFetch')
    const currentTime = new Date().getTime()

    if (storedKey && lastFetchTime && currentTime - lastFetchTime < 24 * 60 * 60 * 1000) {
      return storedKey
    }

    const response = await axios.get<FullKey>('https://italic.units.it/api/v1/full-key')

    await db.put('fullKey', response.data, 'currentKey')
    await db.put('lastFetch', currentTime, 'fullKeyFetch')

    return response.data
  }

  const fetchRecords = async (id: string): Promise<number[]> => {
    if (id === 'full') {
      return []
    }
    const response = await axios.post<{ records: number[] }>(
      'https://italic.units.it/api/v1/key-records',
      { 'key-id': id }
    )
    return response.data.records
  }

  const buildKeyTree = (key: FullKey, records: number[]): Tree => {
    const tree = new Tree()
    tree.buildTree(key.keyData)
    if (keyId.value === 'full') {
      tree.prune4()
      return tree
    }
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
      console.log({ newTree })
      // tentative for one species
      let stepsListFromTree = []
      if (newTree.root && newTree.root.children.length === 0) {
        stepsListFromTree = [newTree.root.data]
      } else {
        stepsListFromTree = newTree.getTreeAsListById() as KeyLead[]
        stepsListFromTree.shift()
      }

      fullKey.value = retrievedFullKey
      recordsList.value = retrievedRecords
      keyTree.value = newTree
      stepsList.value = stepsListFromTree

      if (newTree.root) {
        setRootLeadId(newTree.root.data.leadId.toString())
      }

      speciesList.value = getUniqueSpeciesWithImages()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  const getUniqueSpeciesWithImages = () => {
    if (speciesList.value !== null) {
      return speciesList.value
    }

    const speciesMap = new Map<string, SpeciesInfo>()

    stepsList.value.forEach((item) => {
      if (item.leadSpecies !== null) {
        speciesMap.set(item.leadSpecies, {
          name: item.leadSpecies,
          image: item.speciesImage,
          italicId: item.italicId
        })
      }
    })

    const computedSpeciesList = Array.from(speciesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    return computedSpeciesList
  }

  const getUniqueSpeciesWithRecords = () => {
    const speciesMap = new Map<string, { name: string; records: number[] }>()

    stepsList.value.forEach((item) => {
      if (item.leadSpecies !== null) {
        if (!speciesMap.has(item.leadSpecies)) {
          speciesMap.set(item.leadSpecies, { name: item.leadSpecies, records: [] })
        }

        speciesMap.get(item.leadSpecies)!.records.push(item.leadRecordId)
      }
    })
    return Array.from(speciesMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }

  const setStepsListFromNodeId = (nodeId) => {
    if (nodeId === nodeIdOfCurrentSteps.value) {
      return
    }

    if (parseInt(nodeId) === 1) {
      currentStepsList.value = stepsList.value
      return
    }
    console.log('computing steps')

    const tree = keyTree.value
    if (!tree) {
      return
    }

    const tempStepsList = tree.getTreeAsListById(parseInt(nodeId))

    if (tempStepsList.length === 0) {
      isCurrentNodeValid.value = false
      return
    }

    tempStepsList.shift()
    nodeIdOfCurrentSteps.value = nodeId

    const adjustment = parseInt(nodeId) - 1
    const adjustedStepsList = tempStepsList.map((step) => ({
      ...step,
      leadId: typeof step.leadId === 'number' ? step.leadId - adjustment : step.leadId,
      parentId: typeof step.parentId === 'number' ? step.parentId - adjustment : step.parentId
    }))

    currentStepsList.value = adjustedStepsList
  }

  const setUniqueSpeciesWithImagesFromNodeId = (nodeId) => {
    if (nodeId === nodeIdOfCurrentSpeciesImages.value) {
      return
    }

    if (parseInt(nodeId) === 1) {
      currentUniqueSpeciesWithImages.value = uniqueSpeciesWithImages.value
      return
    }
    console.log('computing species images')

    const tree = keyTree.value
    if (!tree) {
      return
    }

    const tempStepsList = tree.getTreeAsListById(parseInt(nodeId))

    if (tempStepsList.length === 0) {
      isCurrentNodeValid.value = false
      return
    }

    const speciesMap = new Map<string, SpeciesInfo>()

    /*// orig
    tempStepsList.forEach((item) => {
      if (item.leadSpecies !== null) {
        speciesMap.set(item.leadSpecies, {
          name: item.leadSpecies,
          image: item.speciesImage,
          italicId: item.italicId
        })
      }
    })
    // record
    tempStepsList.forEach((item) => {
      if (item.leadSpecies !== null) {
        if (!speciesMap.has(item.leadSpecies)) {
          speciesMap.set(item.leadSpecies, { name: item.leadSpecies, records: [] })
        }
        speciesMap.get(item.leadSpecies)!.records.push(item.leadRecordId)
      }
    })*/
    // combined
    tempStepsList.forEach((item) => {
      if (item.leadSpecies !== null) {
        if (!speciesMap.has(item.leadSpecies)) {
          speciesMap.set(item.leadSpecies, {
            name: item.leadSpecies,
            image: item.speciesImage,
            italicId: item.italicId,
            records: []
          })
        }
        speciesMap.get(item.leadSpecies).records.push(item.leadRecordId)
      }
    })

    currentUniqueSpeciesWithImages.value = Array.from(speciesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    nodeIdOfCurrentSpeciesImages.value = nodeId
  }

  /*const setUniqueSpeciesListFromNodeId = (nodeId) => {
    if (nodeId === nodeIdOfCurrentSpecies.value) {
      return
    }

    console.log('computing species list')

    const tree = keyTree.value
    if (!tree) {
      return
    }

    const tempStepsList = tree.getTreeAsListById(parseInt(nodeId))

    if (tempStepsList.length === 0) {
      isCurrentNodeValid.value = false
      return
    }

    const speciesMap = new Map<string, { name: string; records: number[] }>()

    tempStepsList.forEach((item) => {
      if (item.leadSpecies !== null) {
        if (!speciesMap.has(item.leadSpecies)) {
          speciesMap.set(item.leadSpecies, { name: item.leadSpecies, records: [] })
        }
        speciesMap.get(item.leadSpecies)!.records.push(item.leadRecordId)
      }
    })

    currentUniqueSpeciesList.value = Array.from(speciesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    nodeIdOfCurrentSpecies.value = nodeId
  }*/

  const getNodeIdFromLeadId = (leadId: number) => {
    const tree = keyTree.value
    if (!tree) {
      return null
    }
    if (tree.root.children.length === 0) {
      return tree.root
    }

    const actualNode = tree.find(leadId)
    if (!actualNode) {
      isCurrentNodeValid.value = false
    }

    return actualNode
  }

  /*const setUniqueSpeciesWithRecordsFromNodeId = (nodeId: string) => {
    if (nodeId === nodeIdOfCurrentSpeciesWithRecord.value) {
      return
    }

    console.log('computing species with records')

    const tree = keyTree.value
    if (!tree) {
      return
    }
    let tempStepsList = []
    if (tree.root.children.length === 0) {
      tempStepsList = [tree.root.data]
    } else {
      tempStepsList = tree.getTreeAsListById(parseInt(nodeId))
    }

    //const tempStepsList = tree.getTreeAsListById(parseInt(nodeId))

    if (tempStepsList.length === 0) {
      isCurrentNodeValid.value = false
      return
    }

    const speciesMap = new Map<string, { name: string; records: number[] }>()

    tempStepsList.forEach((item) => {
      if (item.leadSpecies !== null) {
        if (!speciesMap.has(item.leadSpecies)) {
          speciesMap.set(item.leadSpecies, { name: item.leadSpecies, records: [] })
        }
        speciesMap.get(item.leadSpecies)!.records.push(item.leadRecordId)
      }
    })

    currentUniqueSpeciesWithRecords.value = Array.from(speciesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    if (tree.root.children.length === 0) {
      nodeIdOfCurrentSpeciesWithRecord.value = '1'
    } else {
      nodeIdOfCurrentSpeciesWithRecord.value = nodeId
    }
  }*/

  const resetAllExceptKey = () => {
    isLoading.value = false
    rootLeadId.value = null
    currentLeadId.value = null
    error.value = null
    recordsList.value = []
    fullKey.value = null
    keyTree.value = null
    stepsList.value = []
    speciesList.value = null
    nodeIdOfCurrentSteps.value = null
    nodeIdOfCurrentSpecies.value = null
    nodeIdOfCurrentSpeciesImages.value = null
    isCurrentNodeValid.value = true
    currentStepsList.value = []
    currentUniqueSpeciesWithImages.value = []
    currentUniqueSpeciesList.value = []
    currentUniqueSpeciesWithRecords.value = []
  }

  const resetStore = () => {
    resetAllExceptKey()
    keyId.value = null
  }

  return {
    keyId,
    currentLeadId,
    isLoading,
    error,
    recordsList,
    fullKey,
    speciesCount,
    keyTree,
    stepsList,
    setKeyId,
    setCurrentLeadId,
    resetCurrentLeadIdToRoot,
    fetchData,
    getNodeIdFromLeadId,
    getUniqueSpeciesWithImages,
    getUniqueSpeciesWithRecords,

    setStepsListFromNodeId,
    setUniqueSpeciesWithImagesFromNodeId,
    /*setUniqueSpeciesListFromNodeId,*/

    nodeIdOfCurrentSteps,
    nodeIdOfCurrentSpecies,
    nodeIdOfCurrentSpeciesImages,
    nodeIdOfCurrentSpeciesWithRecord,
    isCurrentNodeValid,
    currentStepsList,
    currentUniqueSpeciesWithImages,
    currentUniqueSpeciesList,
    currentUniqueSpeciesWithRecords,
    currentSpeciesCount,
    uniqueSpeciesWithImages,
    resetStore
  }
})
