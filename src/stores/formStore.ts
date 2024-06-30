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
    },
    getFormValuesForSubmission() {
      // return formData but for each key, if the value is an object, return the value of the object
      // i don't like the first condition
      return Object.fromEntries(
        Object.entries(this.formData).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return [key, value.value]
          } else {
            return [key, value]
          }
        })
      )
    }
  }
})
