import { useMutation, useQuery } from '@tanstack/vue-query'
import type { FullKey } from '@/types'
import {
  getStoredFullKey,
  storeFullKey,
  getLastFetchTime,
  updateLastFetchTime
} from '@/utils/indexedDB'
import axios from 'axios'
import { endpoints } from '@/config/endpoints'

export const fetchFullKey = async (): Promise<FullKey> => {
  const storedKey = await getStoredFullKey()
  const lastFetchTime = await getLastFetchTime()
  const currentTime = new Date().getTime()

  if (storedKey && lastFetchTime && currentTime - lastFetchTime < 24 * 60 * 60 * 1000) {
    return storedKey
  }

  const response = await axios.get<FullKey>(endpoints.fullKey)
  await storeFullKey(response.data)
  await updateLastFetchTime()

  return response.data
}

export const fetchRecords = async (id: string): Promise<string[]> => {
  if (id === 'full') {
    return []
  }
  const response = await axios.post<{ records: string[] }>(endpoints.recordsFromKey, {
    'key-id': id
  })
  return response.data.records
}

// for debug
export function useKeyFilterMutation() {
  return useMutation({
    mutationFn: async (filters: any) => {
      const startTime = performance.now()
      const result = await axios.post(endpoints.keyFromFilters, filters).then((res) => res.data)
      const endTime = performance.now()
      console.log(`useKeyFilterMutation execution time: ${endTime - startTime} milliseconds`)
      return result
    }
  })
}

// use to refine a key
export function useKeyRecordsMutation() {
  return useMutation({
    mutationFn: async (records: any) => {
      const startTime = performance.now()
      const result = await axios
        .post(endpoints.keyFromRecords, { records: records })
        .then((res) => res.data)
      const endTime = performance.now()
      console.log(`useKeyFilterMutation execution time: ${endTime - startTime} milliseconds`)
      return result
    }
  })
}

export function useKeyTaxaFilterMutation() {
  return useMutation({
    mutationFn: async (filters: any) => {
      const startTime = performance.now()
      const result = await axios.post(endpoints.keyFromSpecies, filters).then((res) => res.data)
      const endTime = performance.now()
      console.log(`useKeyTaxaFilterMutation execution time: ${endTime - startTime} milliseconds`)
      return result
    }
  })
}

export function useComboboxItemsQuery(fetchKeyName: string, apiEndpoint: string) {
  return useQuery({
    queryKey: ['comboboxItems', apiEndpoint],
    queryFn: async () => {
      const response = await axios.get(apiEndpoint)
      return response.data.map((item: string) => ({
        name: item,
        value: item
      }))
    },
    staleTime: 1000 * 60 * 30, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}

export function useSpeciesQuery() {
  return useQuery({
    queryKey: ['checklist'],
    queryFn: () =>
      fetch(endpoints.speciesList)
        .then((res) => res.json())
        .then((data) => data.checklist),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
