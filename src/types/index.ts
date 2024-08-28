/**
 * The single lead from the general key of ITALIC
 */
export type KeyLead = {
  leadId: number
  coupletNumber: number // for legacy keys DON'T use
  leadText: string | null
  leadTo: number | null // for legacy keys DON'T use
  leadRecordId: string | null
  leadSpeciesId: string | null
  leadSpecies: string | null
  species_description: string | null
  speciesImage: string | null
  leadImage: string | null
  parentId: number
  italicId: number | null
}

/**
 * The full key returned by the ITALIC api
 */
export type FullKey = {
  keyData: KeyLead[]
}

/**
 * The type for the data used by gallery, species-list and adjust
 * */
export type KeyUniqueSpeciesData = {
  name: string
  image: string | null
  italicId: number | null
  records: number[]
}

/**
 * The type for teh form data
 * */
export type FormData = {
  id: string
  title: string
  depend?: {
    id: string
    item: string
  }
  items: Array<{
    value: string
    text: string
    image?: string
  }>
}
