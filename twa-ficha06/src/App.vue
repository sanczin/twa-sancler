<script setup>
// A moldura mantém-se; o RouterView mostra a página do URL atual.
</script>

<template>
  <main>
    <header>
      <p class="eyebrow">Ficha 06 · Rotas e paginação</p>
      <h1>Loja da equipa</h1>
      <p>Equipamento e acessórios para apoiar a tua equipa.</p>
      <nav aria-label="Navegação principal">
        <RouterLink :to="{ name: 'catalog' }">Catálogo</RouterLink>
        <RouterLink :to="{ name: 'new-item' }">Adicionar produto</RouterLink>
        <RouterLink :to="{ name: 'pokemon' }">Pokémon</RouterLink>
      </nav>
    </header>
    <RouterView />
  </main>
</template>

<style>
body { margin: 0; background: #f4f6fa; color: #18253b; font: 16px/1.5 system-ui, sans-serif; }
main { max-width: 1000px; margin: 0 auto; padding: 40px 24px; }
header { margin-bottom: 32px; }
h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 4px 0; }
h2 { margin-top: 0; }
.eyebrow { color: #27589b; font-weight: 600; margin: 0; }
nav { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
a { color: #214d89; }
nav a { padding: 10px 14px; border-radius: 6px; text-decoration: none; }
nav .router-link-active { background: #27589b; color: white; }
.controls { display: flex; align-items: end; flex-wrap: wrap; gap: 16px; }
label { display: grid; gap: 6px; font-weight: 600; }
input, select, button { font: inherit; }
input, select { box-sizing: border-box; padding: 10px; border: 1px solid #8997aa; border-radius: 6px; max-width: 100%; }
button { cursor: pointer; border: 1px solid #8997aa; border-radius: 6px; background: white; color: #18253b; padding: 10px 14px; }
button:hover:not(:disabled) { background: #edf3ff; }
button:disabled { cursor: not-allowed; opacity: 0.5; }
button:focus-visible, input:focus-visible, select:focus-visible, a:focus-visible { outline: 3px solid #27589b; outline-offset: 3px; }
.error { background: white; padding: 24px; margin-top: 24px; border-radius: 8px; border: 1px solid #b22e36; }
.pagination { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin: 24px 0; }
@media (max-width: 480px) {
  main { padding: 24px 16px; }
  .controls, label { width: 100%; }
}
</style>
