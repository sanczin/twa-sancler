<script setup>
import { ref, computed, watch } from 'vue'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'
import { useLoad } from './composables/useLoad.js'
import { getJSON } from './api/getJSON.js'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

const { status, error, data: items, load } = useLoad(() => getJSON('/items.json'))
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

const visible = computed(() => {
  let list = search(items.value ?? [], query.value)
  if (category.value) {
    list = byCategory(list, category.value)
  }
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))
const selected = computed(() =>
  (items.value ?? []).find((item) => item.id === selectedId.value)
)
const counter = computed(() => `${visible.value.length} de ${items.value?.length ?? 0} produtos`)

const nextId = computed(() =>
  Math.max(0, ...(items.value ?? []).map((item) => item.id)) + 1
)

function addItem(item) {
  items.value.push({ id: nextId.value, ...item })
}

watch(query, () => { selectedId.value = null })
</script>

<template>
  <main>
    <header>
      <p class="eyebrow">Ficha 05 · Componentes e formulários</p>
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
          {{ sortDir === 'desc' ? 'Preço: maior para menor ↓' : 'Preço: menor para maior ↑' }}
        </button>
        <button type="button" @click="query = ''">Limpar pesquisa</button>
      </div>

      <p role="status">{{ counter }}</p>
      <p v-if="visible.length === 0">Sem resultados. Experimenta outra pesquisa ou categoria.</p>
      <ItemList v-else :items="visible" :selected-id="selectedId"
                @select="selectedId = $event" />
      <ItemDetail v-if="selected" :item="selected" @close="selectedId = null" />
      <ItemForm :cats="cats" @save="addItem" />
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
:global(input), :global(select), :global(button) { font: inherit; }
:global(input), :global(select) { box-sizing: border-box; padding: 10px; border: 1px solid #8997aa; border-radius: 6px; max-width: 100%; }
:global(button) { cursor: pointer; border: 1px solid #8997aa; border-radius: 6px; background: white; color: #18253b; padding: 10px 14px; }
:global(button:hover) { background: #edf3ff; }
:global(button:focus-visible), :global(input:focus-visible), :global(select:focus-visible) { outline: 3px solid #27589b; outline-offset: 3px; }
.error { background: white; padding: 24px; margin-top: 24px; border-radius: 8px; border: 1px solid #b22e36; }
@media (max-width: 480px) {
  main { padding: 24px 16px; }
  .controls, label { width: 100%; }
}
</style>
