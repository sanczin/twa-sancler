<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({ cats: { type: Array, required: true } })
const emit = defineEmits(['save'])
const empty = { name: '', category: '', price: null, tags: '' }
const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}
  if (form.name.trim().length < 3) e.name = 'O nome deve ter pelo menos 3 caracteres.'
  if (!props.cats.includes(form.category)) e.category = 'Escolhe uma categoria.'
  if (!Number.isFinite(form.price) || form.price <= 0) e.price = 'O preço deve ser maior que 0.'
  else if (Math.abs(form.price * 100 - Math.round(form.price * 100)) > 0.000001) {
    e.price = 'Usa no máximo duas casas decimais.'
  }
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)

function save() {
  if (!isValid.value) return
  emit('save', {
    name: form.name.trim(),
    category: form.category,
    price: form.price,
    tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
  })
  Object.assign(form, empty)
}
</script>

<template>
  <section class="item-form" aria-labelledby="form-title">
    <h2 id="form-title">Adicionar produto</h2>
    <p>Os produtos adicionados ficam nesta sessão e desaparecem ao recarregar a página.</p>
    <form @submit.prevent="save">
      <label for="name">Nome</label>
      <input id="name" v-model.trim="form.name" required minlength="3"
             :aria-invalid="!!errors.name" aria-describedby="name-error" />
      <small v-if="errors.name" id="name-error">{{ errors.name }}</small>

      <label for="new-category">Categoria</label>
      <select id="new-category" v-model="form.category" required
              :aria-invalid="!!errors.category" aria-describedby="category-error">
        <option value="" disabled>Escolhe uma categoria</option>
        <option v-for="cat in cats" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <small v-if="errors.category" id="category-error">{{ errors.category }}</small>

      <label for="price">Preço (€)</label>
      <input id="price" v-model.number="form.price" type="number" min="0.01" step="0.01" required
             :aria-invalid="!!errors.price" aria-describedby="price-error" />
      <small v-if="errors.price" id="price-error">{{ errors.price }}</small>

      <label for="tags">Tags, separadas por vírgulas</label>
      <input id="tags" v-model.trim="form.tags" placeholder="oficial, treino" />
      <button type="submit" :disabled="!isValid">Adicionar</button>
    </form>
  </section>
</template>

<style scoped>
.item-form { background: white; padding: 24px; margin-top: 24px; border: 1px solid #c4cedc; border-radius: 8px; }
h2 { margin-top: 0; }
form { display: grid; gap: 8px; max-width: 480px; }
label { font-weight: 600; margin-top: 8px; }
small { color: #a3222d; }
button { margin-top: 12px; justify-self: start; }
button:disabled { cursor: not-allowed; opacity: 0.5; }
</style>
