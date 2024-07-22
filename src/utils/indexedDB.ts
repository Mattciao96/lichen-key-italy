import { openDB } from 'idb'
import type { FullKey } from '@/types'

interface KeyDB {
  fullKey: {
    key: string
    value: FullKey
  }
  lastFetch: {
    key: string
    value: number
  }
}

const DB_NAME = 'keyStore'
const DB_VERSION = 1

const openKeyDB = () =>
  openDB<KeyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('fullKey')
      db.createObjectStore('lastFetch')
    }
  })

export async function getStoredFullKey(): Promise<FullKey | undefined> {
  const db = await openKeyDB()
  return db.get('fullKey', 'currentKey')
}

export async function getLastFetchTime(): Promise<number | undefined> {
  const db = await openKeyDB()
  return db.get('lastFetch', 'fullKeyFetch')
}

export async function storeFullKey(fullKey: FullKey): Promise<void> {
  const db = await openKeyDB()
  await db.put('fullKey', fullKey, 'currentKey')
}

export async function updateLastFetchTime(): Promise<void> {
  const db = await openKeyDB()
  await db.put('lastFetch', Date.now(), 'fullKeyFetch')
}
