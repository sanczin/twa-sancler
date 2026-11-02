<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ItemForm from '../components/ItemForm.vue'
import { categories } from '../catalog.js'
import { items, status, error, load, ensureLoaded, addItem } from '../store.js'

const router = useRouter()
onMounted(ensureLoaded)
const cats = computed(() => categories(items.value ?? []))

function onSave(item) {
  const id = addItem(item)
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <RouterLink :to="{ name: 'catalog' }">← Voltar ao catálogo</RouterLink>
  <p v-if="status === 'idle' || status === 'loading'" role="status">A carregar as categorias…</p>
  <section v-else-if="status === 'error'" role="alert" class="error">
    <p>{{ error }}</p>
    <button type="button" @click="load">Tentar novamente</button>
  </section>
  <ItemForm v-else :cats="cats" @save="onSave" />
</template>
