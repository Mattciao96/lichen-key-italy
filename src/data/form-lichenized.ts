import type { FormData } from '@/types'
export const lichenizedData: FormData[] = [
  {
    id: 'non-lichen',
    title: 'Non lichenized species',
    items: [
      { value: 'null', text: 'Include non-lichenized species' },
      { value: 'lic', text: 'Only non-lichenized species' },
      { value: 'without', text: 'Exclude non-lichenized species' }
    ]
  }
]
