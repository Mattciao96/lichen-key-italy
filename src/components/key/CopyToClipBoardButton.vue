<template>
  <button
    @click="copyToClipboard"
    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Copy to Clipboard
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface KeyItem {
  leadId: number
  parentId: number
  leadText: string
  leadImage: string | null
  speciesImage: string | null
}

const props = defineProps<{
  stepsList: KeyItem[]
}>()

const emit = defineEmits<{
  (e: 'copySuccess'): void
  (e: 'copyError', error: Error): void
}>()

const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) return ''

  // remove image and add thumbnail
  const path = imagePath.split('/')
  path.splice(2, 1, 'thumbnails')

  return `<img width="100" height="70" src="https://italic.units.it/flora/${path.join('/')}" alt="">`
}

const getTableData = (): string => {
  const tableRows = props.stepsList
    .map(
      (item) => `
    <tr>
      <td style="padding: 4px;">${item.parentId}</td>
      <td style="padding: 4px;">${item.leadText}</td>

      <td style="padding: 4px;">${getImageUrl(item.speciesImage)}</td>
      <td style="padding: 4px;">${item.leadId}</td>
    </tr>
  `
    )
    .join('')

  const tableHtml = `
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="padding: 4px;">Couplet</th>
          <th style="padding: 4px;">Lead Text</th>

          <th style="padding: 4px;">Species Image</th>
          <th style="padding: 4px;">Lead to</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `

  return tableHtml
}

const copyToClipboard = async () => {
  try {
    const data = getTableData()
    const blob = new Blob([data], { type: 'text/html' })
    const clipboardItem = new ClipboardItem({ 'text/html': blob })
    await navigator.clipboard.write([clipboardItem])
    emit('copySuccess')
  } catch (error) {
    console.error('Failed to copy data: ', error)
    emit('copyError', error instanceof Error ? error : new Error('Unknown error'))
  }
}
</script>
