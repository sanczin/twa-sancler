<script setup>
defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['close'])
</script>

<template>
  <section class="detail" aria-labelledby="detail-title">
    <h2 id="detail-title">{{ item.name }}</h2>
    <p>Preço: {{ item.price.toFixed(2) }} €</p>
    <p>Tags: {{ item.tags.join(', ') || 'Sem tags' }}</p>
    <p>Cor: {{ item.details?.color || 'Não indicada' }}</p>
    <p>Tamanho: {{ item.details?.size || 'Não indicado' }}</p>
    <button type="button" @click="emit('close')">Fechar detalhes</button>
  </section>
</template>

<style scoped>
.detail { background: white; padding: 24px; margin-top: 24px; border-radius: 8px; border: 1px solid #c4cedc; border-left: 5px solid #27589b; }
h2 { margin-top: 0; }
</style>
