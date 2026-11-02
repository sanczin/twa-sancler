<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null },
})
const emit = defineEmits(['select'])
</script>

<template>
  <ul class="products">
    <li v-for="item in items" :key="item.id"
        :class="{ selected: item.id === selectedId }">
      <button type="button" :aria-pressed="item.id === selectedId"
              @click="emit('select', item.id)">
        <span class="product-category">{{ item.category }}</span>
        <span class="product-name">{{ item.name }}</span>
        <strong>{{ item.price.toFixed(2) }} €</strong>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.products { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
li { min-width: 0; }
button { display: grid; gap: 10px; width: 100%; height: 100%; text-align: left; padding: 20px; }
.product-category { color: #526078; font-size: 0.85rem; }
.product-name { font-size: 1.1rem; font-weight: 600; }
.selected button { border-color: #27589b; background: #e9f1ff; box-shadow: 0 0 0 2px #27589b; }
</style>
