// composables/useKeyApi.ts
import { useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://italic.units.it/api/v1'
})

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

export function useKeyRecordsQuery(keyId: string) {
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
}

export function useFullKeyQuery() {
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
}

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
