<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ItemList from '../components/ItemList.vue'
import { items, status, error, load, ensureLoaded } from '../store.js'
import { search, byCategory, categories, sortByPrice } from '../catalog.js'

const router = useRouter()
onMounted(ensureLoaded)
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const cats = computed(() => categories(items.value ?? []))
const visible = computed(() => {
  let list = search(items.value ?? [], query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})
</script>

<template>
  <h2>Catálogo</h2>
  <p v-if="status === 'idle' || status === 'loading'" role="status">A carregar os produtos…</p>
  <section v-else-if="status === 'error'" role="alert" class="error">
    <h3>Não foi possível abrir o catálogo</h3>
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
    <p role="status">{{ visible.length }} de {{ items.length }} produtos</p>
    <p v-if="visible.length === 0">Sem resultados. Experimenta outra pesquisa ou categoria.</p>
    <ItemList v-else :items="visible"
              @select="router.push({ name: 'item', params: { id: $event } })" />
  </template>
</template>
