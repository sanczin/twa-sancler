import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

// Estes refs pertencem ao módulo: são partilhados por todas as páginas.
export const items = ref(null)
export const status = ref('idle')
export const error = ref(null)

export async function load() {
  if (status.value === 'loading') return
  status.value = 'loading'
  error.value = null
  try {
    items.value = await getJSON('/items.json')
    status.value = 'ready'
  } catch (err) {
    error.value = err.message
    status.value = 'error'
  }
}

export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') return load()
}

export function addItem(item) {
  const id = Math.max(0, ...items.value.map((i) => i.id)) + 1
  items.value.push({ ...item, id })
  return id
}
