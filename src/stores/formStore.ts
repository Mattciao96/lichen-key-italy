import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useFormStore = defineStore('form', {
  state: () => ({
    formData: reactive({})
  }),
  actions: {
    updateFormField(groupId, value) {
      this.formData[groupId] = value
    },
    updateSelectFormField(groupId, option) {
      this.formData[groupId] = option
    },
    getFormField(groupId) {
      return this.formData[groupId]
    },
    existsFormField(groupId) {
      return this.formData.hasOwnProperty(groupId)
    },
    removeFormField(groupId) {
      delete this.formData[groupId]
    },
    resetForm() {
      this.formData = {}
    }
  }
})
