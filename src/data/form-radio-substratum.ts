// 4 has only 1, 2 and 3
import type { FormData } from '@/types'
export const radioDataSubstratum: FormData[] = [
  {
    id: '4-pseudo',
    title: 'Substratum',
    items: [
      { text: 'Bark and wood', value: '1', image: 'bark.png' },
      {
        text: 'Living leaves',
        value: '4',
        image: 'leaf.png'
      },
      { text: 'Rock', value: '3', image: 'rock.png' },
      {
        text: 'Soil, terricolous mosses and plant debris',
        value: '2',
        image: 'soil.png'
      }
    ]
  }
]
