<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()
// O URL é a fonte de verdade; valores inválidos são tratados como página 1.
const page = computed(() => {
  const value = Number(route.query.page ?? 1)
  return Number.isSafeInteger(value) && value > 0 ? value : 1
})
const { status, error, data, load } = useLoad(() => list(page.value))
watch(page, load)
const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { ...route.query, page: p } })
}
</script>

<template>
  <h2>Pokémon</h2>
  <p>Uma página de cada vez, com dados da PokéAPI.</p>
  <div class="pagination" aria-label="Paginação">
    <button type="button" :disabled="page <= 1" @click="go(page - 1)">‹ Anterior</button>
    <span role="status">Página {{ page }} de {{ pages || '…' }}</span>
    <button type="button" :disabled="pages === 0 || page >= pages" @click="go(page + 1)">Seguinte ›</button>
  </div>
  <p v-if="status === 'loading'" role="status">A carregar Pokémon…</p>
  <section v-else-if="status === 'error'" role="alert" class="error">
    <p>{{ error }}</p>
    <button type="button" @click="load">Tentar novamente</button>
  </section>
  <template v-else>
    <p v-if="data.results.length === 0">
      Página sem resultados.
      <RouterLink :to="{ name: 'pokemon', query: { page: 1 } }">Voltar à primeira página</RouterLink>
    </p>
    <ul v-else class="pokemon-list">
      <li v-for="p in data.results" :key="p.name">{{ p.name }}</li>
    </ul>
  </template>
</template>

<style scoped>
.pokemon-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; padding: 0; list-style: none; }
.pokemon-list li { padding: 16px; border: 1px solid #c4cedc; border-radius: 6px; background: white; }
</style>
