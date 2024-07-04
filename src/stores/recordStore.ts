// stores/recordStore.ts
import { defineStore } from 'pinia'

export const useRecordStore = defineStore('record', {
  state: () => ({
    records: [] as string[],
    keyId: '' as string
  }),
  actions: {
    setRecords(records: string[]) {
      this.records = records
    },
    setKeyId(keyId: string) {
      this.keyId = keyId
    },
    resetRecords() {
      this.records = []
      this.keyId = ''
    }
  }
})
