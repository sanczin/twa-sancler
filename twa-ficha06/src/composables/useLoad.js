import { ref, onMounted, onUnmounted } from 'vue'

export function useLoad(fetcher) {
  const status = ref('loading')
  const error = ref(null)
  const data = ref(null)
  let request = 0

  async function load() {
    const current = ++request
    status.value = 'loading'
    error.value = null
    try {
      const result = await fetcher()
      if (current !== request) return
      data.value = result
      status.value = 'ready'
    } catch (err) {
      if (current !== request) return
      error.value = err.message
      status.value = 'error'
    }
  }

  onMounted(load)
  // Ignora respostas antigas e respostas que chegam depois de sair da página.
  onUnmounted(() => { request++ })
  return { status, error, data, load }
}
