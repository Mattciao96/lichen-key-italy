import { defineStore } from 'pinia'

export const useSpeciesStore = defineStore('species', {
  state: () => ({
    selectedSpecies: [] as string[]
  }),
  actions: {
    setSelectedSpecies(species: string[]) {
      this.selectedSpecies = species
    },
    addSpecies(species: string) {
      if (!this.selectedSpecies.includes(species)) {
        this.selectedSpecies.push(species)
      }
    },
    removeSpecies(species: string) {
      this.selectedSpecies = this.selectedSpecies.filter((s) => s !== species)
    }
  }
})
