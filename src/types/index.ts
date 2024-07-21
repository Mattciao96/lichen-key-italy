/**
 * The leads list from the general key of ITALIC
 */
export type KeyLeadList = KeyLead[]

/**
 * The single lead from the general key of ITALIC
 */
export type KeyLead = {
  leadId: number
  coupletNumber: number
  leadText: string | null
  leadTo: number | null
  leadRecordId: string | null
  leadSpeciesId: string | null
  leadSpecies: string | null
  species_description: string | null
  speciesImage: string | null
  leadImage: string | null
  parentId: number
  italicId: number | null
}
