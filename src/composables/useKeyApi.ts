// composables/useKeyApi.ts
import { useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://italic.units.it/api/v1'
})

export function useKeyFilterMutation() {
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
}
