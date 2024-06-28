export const selectDataArea = [
  {
    id: 'area',
    title: 'taxa to work on:',
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
      { value: 'H', text: 'Dry Mediterranean' },
      { value: 'D', text: 'Dry Submediterranean' },
      { value: 'G', text: 'Humid Mediterranean' },
      { value: 'F', text: 'Humid Submediterranean' },

      { value: 'C', text: 'Montane' },
      { value: 'B', text: 'Oromediterranean' },
      { value: 'E', text: 'Padanian' },

      { value: 'A1', text: 'Subalpine' }
    ]
  }
]
