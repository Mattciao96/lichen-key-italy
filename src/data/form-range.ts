import type { FormData } from '@/types'
export const rangeData: FormData[] = [
  {
    id: 'PH',
    title: 'pH of the substratum',
    items: [
      {
        value: '1',
        text: '1: on very acid substrata, such as lignum and conifer bark'
      },
      {
        value: '2',
        text: '2: on acid substrata, such on non-eutrophicated bark of Quercus'
      },
      {
        value: '3',
        text: '3: on subacid to subneutral substrata (e.g. on bark of Sambucus)'
      },
      {
        value: '4',
        text: '4: on slightly basic substrata, such as dust-covered bark'
      },
      {
        value: '5',
        text: '5: on basic substrata, e.g. pure limestone'
      }
    ]
  },

  {
    id: 'LIG',
    title: 'Solar irradiation',
    items: [
      {
        value: '1',
        text: '1: in very shaded situations, e.g. deep gorges, closed evergreen forests'
      },
      {
        value: '2',
        text: '2: in shaded situations, such as on the northern side of boles in close-canopied deciduous forests'
      },
      {
        value: '3',
        text: '3: in sites with plenty of diffuse light but scarce direct solar irradiation, such as in rather open-canopied deciduous woodlands'
      },
      {
        value: '4',
        text: '4: in sun-exposed sites, but avoiding extreme solar irradiation'
      },
      {
        value: '5',
        text: '5: in sites with very high direct solar irradiation, e.g. on the southern side of isolated boles'
      }
    ]
  },

  {
    id: 'ARID',
    title: 'Aridity',
    items: [
      {
        value: '1',
        text: '1: hygrophytic, in sites with a very high frequency of fog'
      },
      {
        value: '2',
        text: '2: rather hygrophytic, intermediate between 1 and 2'
      },
      {
        value: '3',
        text: '3: mesophytic'
      },
      {
        value: '4',
        text: '4: xerophytic, but absent from extremely arid stands'
      },
      {
        value: '5',
        text: '5: very xerophytic'
      }
    ]
  },

  {
    id: 'EUTRO',
    title: 'Eutrophication',
    items: [
      {
        value: '1',
        text: '1: no eutrophication'
      },
      {
        value: '2',
        text: '2: very weak eutrophication'
      },
      {
        value: '3',
        text: '3: weak eutrophication'
      },
      {
        value: '4',
        text: '4: rather high eutrophication'
      },
      {
        value: '5',
        text: '5: very high eutrophication'
      }
    ]
  },

  {
    id: 'PF',
    title: 'Poleotolerance',
    items: [
      {
        value: '0',
        text: '0: species which exclusively occur on old trees in ancient, undisturbed forests'
      },
      {
        value: '1',
        text: '1: species mostly occurring in natural or semi-natural habitats'
      },
      {
        value: '2',
        text: '2: species occurring also in moderately disturbed areas (agricultural areas, small settlements etc.)'
      },
      {
        value: '3',
        text: '3: species occurring also in heavily disturbed areas, incl. large towns'
      }
    ]
  },
  {
    id: 'ALT',
    title: 'Altitudinal distribution',
    items: [
      {
        value: '1',
        text: '1: eu-Mediterranean belt (potential vegetation: evergreen Quercus ilex forest)'
      },
      {
        value: '2',
        text: '2: submediterranean belt (deciduous Quercus-Carpinus forests)'
      },
      {
        value: '3',
        text: '3: montane belt (Fagus forests, marking treeline in the Apennines)'
      },
      {
        value: '4',
        text: '4: subalpine and oroboreal belts of the Alps (natural Picea abies, and Larix-Pinus cembra stands)'
      },
      {
        value: '5',
        text: '5: above treeline (both Alpine and oromediterranean)'
      },
      {
        value: '6',
        text: '6: nival belt of the Alps'
      }
    ]
  }
]
