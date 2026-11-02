<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ItemDetail from '../components/ItemDetail.vue'
import { items, status, error, load, ensureLoaded } from '../store.js'

const route = useRoute()
const router = useRouter()
onMounted(ensureLoaded)
const id = computed(() => Number(route.params.id))
// O computed reage também a /items/1 → /items/2, sem voltar a montar.
const item = computed(() => (items.value ?? []).find((i) => i.id === id.value))
</script>

<template>
  <RouterLink :to="{ name: 'catalog' }">← Voltar ao catálogo</RouterLink>
  <p v-if="status === 'idle' || status === 'loading'" role="status">A carregar o produto…</p>
  <section v-else-if="status === 'error'" role="alert" class="error">
    <p>{{ error }}</p>
    <button type="button" @click="load">Tentar novamente</button>
  </section>
  <p v-else-if="!item">Produto {{ route.params.id }} não encontrado.</p>
  <ItemDetail v-else :item="item" @close="router.push({ name: 'catalog' })" />
</template>
