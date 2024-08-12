import type { FormData } from '@/types'
interface RegionEcoregionMap {
  [regionId: string]: string[]
}

export const regionToEcoregionMap: RegionEcoregionMap = {
  // All ecoregions
  ITA: ['A', 'A1', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  Abr: ['B', 'C', 'D', 'E'],
  Bas: ['B', 'C', 'D', 'F', 'G', 'H'],
  Cal: ['B', 'C', 'D', 'F', 'G', 'H'],
  Camp: ['B', 'C', 'D', 'F', 'G'],
  Emil: ['A', 'A1', 'C', 'D', 'E'],
  Frl: ['A', 'A1', 'C', 'E', 'F', 'H'],
  Laz: ['B', 'C', 'F', 'G'],
  Lig: ['A', 'A1', 'C', 'D', 'F', 'G'],
  Lomb: ['A', 'A1', 'C', 'D', 'E'],
  Marc: ['B', 'C', 'D', 'E'],
  Mol: ['B', 'C', 'D', 'H'],
  Piem: ['A', 'A1', 'C', 'D', 'E'],
  Pugl: ['C', 'D', 'D', 'F', 'H'],
  Sar: ['B', 'C', 'D', 'F', 'G', 'H'],
  Si: ['B', 'C', 'D', 'F', 'G', 'H'],
  Tosc: ['A', 'C', 'D', 'F', 'G'],
  TAA: ['A', 'A1', 'C', 'D'],
  Umb: ['B', 'C', 'D', 'F'],
  VA: ['A', 'A1', 'C', 'D'],
  Ven: ['A', 'A1', 'C', 'F', 'E'],
  VG: ['D']
}
export const selectDataArea: FormData[] = [
  {
    id: 'area',
    title: 'Taxa to work on',
    items: [
      { value: 'italy', text: 'Only species known from Italy' },
      {
        value: 'outside-italy',
        text: 'With additional species to be looked for in Italy'
      }
    ]
  },
  {
    id: 'region',
    title: 'Administrative region',
    depend: { id: 'area', item: 'italy' },
    items: [
      { value: 'ITA', text: 'All Italy' },
      { value: 'Abr', text: 'Abruzzo' },
      { value: 'Bas', text: 'Basilicata' },
      { value: 'Cal', text: 'Calabria' },
      { value: 'Camp', text: 'Campania' },
      { value: 'Emil', text: 'Emilia-Romagna' },
      { value: 'Frl', text: 'Friuli' },
      { value: 'Laz', text: 'Lazio' },
      { value: 'Lig', text: 'Liguria' },
      { value: 'Lomb', text: 'Lombardia' },
      { value: 'Marc', text: 'Marche' },
      { value: 'Mol', text: 'Molise' },
      { value: 'Piem', text: 'Piemonte' },
      { value: 'Pugl', text: 'Puglia' },
      { value: 'Sar', text: 'Sardegna' },
      { value: 'Si', text: 'Sicilia' },
      { value: 'Tosc', text: 'Toscana' },
      { value: 'TAA', text: 'Trentino-Alto Adige' },
      { value: 'Umb', text: 'Umbria' },
      { value: 'VA', text: "Valle d'Aosta" },
      { value: 'Ven', text: 'Veneto' },
      { value: 'VG', text: 'Venezia Giulia' }
    ]
  },
  {
    id: 'ecoregion',
    title: 'Ecoregion',
    depend: { id: 'area', item: 'italy' },
    items: [
      { value: 'All', text: 'All ecoregions' },
      { value: 'A', text: 'Alpine' },
      { value: 'A1', text: 'Subalpine' },
      { value: 'B', text: 'Oromediterranean' },
      { value: 'C', text: 'Montane' },
      { value: 'D', text: 'Dry Submediterranean' },
      { value: 'E', text: 'Padanian' },
      { value: 'F', text: 'Humid Submediterranean' },
      { value: 'G', text: 'Humid Mediterranean' },
      { value: 'H', text: 'Dry Mediterranean' }
    ]
  }
]
