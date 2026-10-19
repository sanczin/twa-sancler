<script setup>
import { ref, computed } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

const visible = computed(() => {
  let list = search(items.value, query.value)
  if (category.value) {
    list = byCategory(list, category.value)
  }
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value))
const selected = computed(() =>
  items.value.find((item) => item.id === selectedId.value)
)
const counter = computed(() => `${visible.value.length} de ${items.value.length} produtos`)

async function load() {
  status.value = 'loading'
  error.value = null

  try {
    const res = await fetch('/items.json')
    if (!res.ok) {
      throw new Error(`Não foi possível carregar os produtos (HTTP ${res.status}).`)
    }
    items.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    status.value = error.value === null ? 'ready' : 'error'
  }
}

load()
</script>

<template>
  <main>
    <header>
      <p class="eyebrow">Ficha 04 · Catálogo em Vue</p>
      <h1>Loja da equipa</h1>
      <p>Equipamento e acessórios para apoiar a tua equipa.</p>
    </header>

    <p v-if="status === 'loading'" role="status">A carregar os produtos…</p>
    <section v-else-if="status === 'error'" role="alert" class="error">
      <h2>Não foi possível abrir o catálogo</h2>
      <p>{{ error }}</p>
      <button type="button" @click="load">Tentar novamente</button>
    </section>
    <template v-else>
      <div class="controls">
        <label>
          Pesquisa
          <input v-model="query" type="search" placeholder="Nome ou tag do produto" />
        </label>
        <label>
          Categoria
          <select v-model="category">
            <option value="">Todas as categorias</option>
            <option v-for="cat in cats" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </label>
        <button type="button" @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'">
          {{ sortDir === 'desc' ? 'Preço: maior para menor' : 'Preço: menor para maior' }}
        </button>
        <button type="button" @click="query = ''">Limpar pesquisa</button>
      </div>

      <p role="status">{{ counter }}</p>
      <p v-if="visible.length === 0">Sem resultados. Experimenta outra pesquisa ou categoria.</p>
      <ul v-else class="products">
        <li v-for="item in visible" :key="item.id"
            :class="{ selected: item.id === selectedId }">
          <button type="button" :aria-pressed="item.id === selectedId"
                  @click="selectedId = item.id">
            <span class="product-category">{{ item.category }}</span>
            <span class="product-name">{{ item.name }}</span>
            <strong>{{ item.price.toFixed(2) }} €</strong>
          </button>
        </li>
      </ul>

      <section v-if="selected" class="detail" aria-labelledby="detail-title">
        <h2 id="detail-title">{{ selected.name }}</h2>
        <p>Preço: {{ selected.price.toFixed(2) }} €</p>
        <p>Tags: {{ selected.tags.join(', ') }}</p>
        <p>Cor: {{ selected.details.color }}</p>
        <p>Tamanho: {{ selected.details.size }}</p>
        <button type="button" @click="selectedId = null">Fechar detalhes</button>
      </section>
    </template>
  </main>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background: #f4f6fa;
  color: #18253b;
  font: 16px/1.5 system-ui, sans-serif;
}
main { max-width: 1000px; margin: 0 auto; padding: 40px 24px; }
header { margin-bottom: 32px; }
h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 4px 0; }
h2 { margin-top: 0; }
.eyebrow { color: #27589b; font-weight: 600; margin: 0; }
.controls { display: flex; align-items: end; flex-wrap: wrap; gap: 16px; }
label { display: grid; gap: 6px; font-weight: 600; }
input, select, button { font: inherit; }
input, select { box-sizing: border-box; padding: 10px; border: 1px solid #8997aa; border-radius: 6px; max-width: 100%; }
button { cursor: pointer; border: 1px solid #8997aa; border-radius: 6px; background: white; color: #18253b; padding: 10px 14px; }
button:hover { background: #edf3ff; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid #27589b; outline-offset: 3px; }
.products { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.products li { min-width: 0; }
.products button { display: grid; gap: 10px; width: 100%; height: 100%; text-align: left; padding: 20px; }
.product-category { color: #526078; font-size: 0.85rem; }
.product-name { font-size: 1.1rem; font-weight: 600; }
.selected button { border-color: #27589b; background: #e9f1ff; box-shadow: 0 0 0 2px #27589b; }
.detail, .error { background: white; padding: 24px; margin-top: 24px; border-radius: 8px; border: 1px solid #c4cedc; }
.detail { border-left: 5px solid #27589b; }
.error { border-color: #b22e36; }
@media (max-width: 480px) {
  main { padding: 24px 16px; }
  .controls, label { width: 100%; }
}
</style>
