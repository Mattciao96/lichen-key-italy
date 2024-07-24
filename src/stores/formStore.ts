import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { combinedData } from '@/data/form-combined'

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: reactive({}),
    referenceData: combinedData
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

    getSelectedFilters() {
      return Object.fromEntries(
        Object.entries(this.formData).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return [key, value.value]
          } else {
            return [key, value]
          }
        })
      )
    },

    getSelectedFiltersWithDetails() {
      const selectedFilters = this.getSelectedFilters()
      const result = []

      for (const referenceItem of this.referenceData) {
        const selectedValue = selectedFilters[referenceItem.id]

        if (selectedValue !== undefined) {
          // exception for genus and family
          if (referenceItem.id === 'genus' || referenceItem.id === 'family') {
            result.push({
              id: referenceItem.id,
              title: referenceItem.title,
              value: selectedValue,
              text: selectedValue
            })
            continue
          }

          const selectedItemText = referenceItem.items.find(
            (item) => item.value === selectedValue
          )?.text

          result.push({
            id: referenceItem.id,
            title: referenceItem.title,
            value: selectedValue,
            text: selectedItemText || selectedValue
          })
        }
      }

      return result
    },

    getFormValuesForSubmission() {
      // return formData but for each key, if the value is an object, return the value of the object
      // I don't like the first condition
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
