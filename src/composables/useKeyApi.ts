import { useMutation, useQuery } from '@tanstack/vue-query'
import type { FullKey } from '@/types'
import {
  getStoredFullKey,
  storeFullKey,
  getLastFetchTime,
  updateLastFetchTime
} from '@/utils/indexedDB'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://italic.units.it/api/v1'
})

export const fetchFullKey = async (): Promise<FullKey> => {
  const storedKey = await getStoredFullKey()
  const lastFetchTime = await getLastFetchTime()
  const currentTime = new Date().getTime()

  if (storedKey && lastFetchTime && currentTime - lastFetchTime < 24 * 60 * 60 * 1000) {
    return storedKey
  }

  const response = await axios.get<FullKey>('https://italic.units.it/api/v1/full-key')
  await storeFullKey(response.data)
  await updateLastFetchTime()

  return response.data
}

export const fetchRecords = async (id: string): Promise<string[]> => {
  if (id === 'full') {
    return []
  }
  const response = await axios.post<{ records: string[] }>(
    'https://italic.units.it/api/v1/key-records',
    { 'key-id': id }
  )
  return response.data.records
}

/*
export function useFullKeyQuery() {
  return useQuery({
    queryKey: ['fullKey'],
    queryFn: async () => {
      // Check IndexedDB cache first
      const storedKey = await getStoredFullKey()
      const lastFetchTime = await getLastFetchTime()
      const currentTime = Date.now()

      if (storedKey && lastFetchTime && currentTime - lastFetchTime < 24 * 60 * 60 * 1000) {
        console.log('Using cached full key data')
        return storedKey
      }

      // Fetch from API if cache is invalid or missing
      const result = await axios
        .get('https://italic.units.it/api/v1/full-key')
        .then((res) => res.data)

      // Update cache
      await Promise.all([storeFullKey(result), updateLastFetchTime()])

      return result
    },

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
*/
/*

export function useKeyRecordsQuery(keyId: string | null) {
  return useQuery({
    queryKey: ['keyRecords', keyId],
    queryFn: async ({ signal }) => {
      if (!keyId || keyId === 'full' || keyId === 'no-data') {
        return []
      }
      const startTime = performance.now()
      const response = await axios.post<{ records: number[] }>(
        'https://italic.units.it/api/v1/key-records',
        { 'key-id': keyId },
        { signal }
      )
      const endTime = performance.now()
      console.log(`fetchRecords execution time: ${endTime - startTime} milliseconds`)
      return response.data.records
    },
    onError: (error) => {
      console.error('KeyRecord query error:', error)
    },
    enabled: !!keyId && keyId !== 'full' && keyId !== 'no-data', // Only run the query if keyId is truthy and not 'full'
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
*/

/*export function useKeyFilterMutation() {
  return useMutation({
    mutationFn: (filters: any) => api.post('/key-filter', filters).then((res) => res.data)
  })
}

export function useKeyRecordsQuery(keyId: string) {
  return useQuery({
    queryKey: ['keyRecords', keyId],

    queryFn: () => api.post('/key-records', { 'key-id': keyId }).then((res) => res.data),
    enabled: !!keyId
  })
}*/

// for debug
export function useKeyFilterMutation() {
  return useMutation({
    mutationFn: async (filters: any) => {
      const startTime = performance.now()
      const result = await api.post('/key-filter', filters).then((res) => res.data)
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
      const result = await api
        .post('/key-id-from-records', { records: records })
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
      const result = await api.post('/taxa-records', filters).then((res) => res.data)
      const endTime = performance.now()
      console.log(`useKeyTaxaFilterMutation execution time: ${endTime - startTime} milliseconds`)
      return result
    }
  })
}

/*export function useKeyRecordsQuery(keyId: string) {
  return useQuery({
    queryKey: ['keyRecords', keyId],
    queryFn: async () => {
      const startTime = performance.now()
      const result = await api.post('/key-records', { 'key-id': keyId }).then((res) => res.data)
      const endTime = performance.now()
      console.log(`useKeyRecordsQuery execution time: ${endTime - startTime} milliseconds`)
      return result
    },
    enabled: !!keyId
  })
}*/

/*export function useFullKeyQuery() {
  return useQuery({
    queryKey: ['fullKey'],
    staleTime: Infinity, // Data will never go stale
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    queryFn: async () => {
      const startTime = performance.now()
      const result = await axios
        .get('https://italic.units.it/api/v1/full-key')
        .then((res) => res.data)

      const endTime = performance.now()
      console.log(`fullKey execution time: ${endTime - startTime} milliseconds`)
      return result
    }
  })
}*/

export function useComboboxItemsQuery(fetchKeyName: string, apiEndpoint: string) {
  return useQuery({
    queryKey: ['comboboxItems', apiEndpoint],
    queryFn: async () => {
      const response = await api.get(apiEndpoint)
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
