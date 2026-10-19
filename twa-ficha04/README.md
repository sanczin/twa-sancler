# Ficha 04 — Catálogo em Vue

Catálogo da loja da equipa, convertido da Ficha 03 para Vue com Vite.
Reutiliza sem alterações `src/catalog.js`, `public/items.json` e `check.js`.
O componente `App.vue` usa refs para o estado e computed para os valores derivados.
Inclui pesquisa, categorias, ordenação por preço, seleção e detalhes do produto,
estados de carregamento e erro com botão para tentar novamente.
Bónus B: contador de produtos visíveis e botão para limpar a pesquisa.

## Executar

Nesta pasta:

```cmd
npm.cmd install
npm.cmd run dev
```

Abrir o endereço indicado pelo Vite. Para verificar as funções e compilar:

```cmd
node check.js
npm.cmd run build
```

## Perguntas de reflexão

1. O estado passou do `main.js` para refs no `<script setup>` do `App.vue`; o `render()` manual foi substituído pelo template e pelas atualizações do Vue; os handlers passaram para `v-model` e `@click`.
2. No script, `items` é um objeto ref e o seu valor está em `items.value`. No template, o Vue desembrulha automaticamente os refs, pelo que se usa apenas `items`.
3. `visible` é um computed porque deriva dos produtos, pesquisa, categoria e ordenação, atualizando-se quando essas dependências mudam. Com um ref atualizado em cada handler, seria fácil esquecer uma atualização e mostrar resultados desatualizados.
4. `:key` identifica cada produto entre atualizações. Usar o índice numa lista que reordena pode associar o estado de um elemento ao produto errado, porque a posição muda mas a chave fica igual.

## Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.
