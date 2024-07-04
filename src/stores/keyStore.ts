// stores/keyStore.js
import { defineStore } from 'pinia'
import Tree from '@/utils/key-builder'

export const useKeyStore = defineStore('key', {
  state: () => ({
    tree: null,
    records: [],
    keyId: ''
  }),
  actions: {
    buildTree(data) {
      const newTree = new Tree()
      newTree.buildTree(data)
      this.tree = newTree
    },
    pruneTree() {
      if (this.tree && this.records.length > 0) {
        this.tree.prune3(this.records)
      }
    },
    setRecords(records, keyId) {
      this.records = records
      this.keyId = keyId
    }
  }
})
