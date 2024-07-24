import { selectDataArea } from '@/data/form-area'
import { lichenizedData } from '@/data/form-lichenized'
import { radioData } from '@/data/form-radio'
import { radioDataSubstratum } from '@/data/form-radio-substratum'
import { rangeData } from '@/data/form-range'
import { rarityData } from '@/data/form-rarity'
import { selectData } from '@/data/form-select'
import { comboBoxData } from '@/data/form-combobox'
import type { FormData } from '@/types'

export const combinedData = [
  ...selectDataArea,
  ...transformRangeData(rarityData),
  ...lichenizedData,
  ...comboBoxData,
  ...radioData,
  ...radioDataSubstratum,
  ...transformRangeData(rangeData),
  ...selectData
]

function transformRangeData(data: FormData[]): FormData[] {
  return data.flatMap((item) => [
    {
      id: `${item.id}1`,
      title: `${item.title} min`,
      items: item.items
    },
    {
      id: `${item.id}2`,
      title: `${item.title} max`,
      items: item.items
    }
  ])
}
