import assert from 'node:assert/strict'

import {
  byCategory,
  search,
  total,
  top,
  categories,
  withDiscount,
  sortByPrice,
} from './src/catalog.js'

const sample = [
  {
    id: 1,
    name: 'Camisola',
    category: 'equipamento',
    price: 50,
    tags: ['oficial'],
  },
  {
    id: 2,
    name: 'Cachecol',
    category: 'acessórios',
    price: 15,
    tags: ['inverno'],
  },
  {
    id: 3,
    name: 'Meias',
    category: 'equipamento',
    price: 10,
    tags: ['oficial'],
  },
]

const original = structuredClone(sample)

// Filtrar por categoria
assert.deepEqual(
  byCategory(sample, 'equipamento').map((item) => item.id),
  [1, 3]
)

// Pesquisar pelo nome, ignorando maiúsculas
assert.deepEqual(
  search(sample, 'CAMI').map((item) => item.id),
  [1]
)

// Pesquisar pelas tags
assert.deepEqual(
  search(sample, 'INVER').map((item) => item.id),
  [2]
)

// Somar os preços
assert.equal(total(sample), 75)

// Obter os dois produtos mais caros
assert.deepEqual(
  top(sample, 2).map((item) => item.id),
  [1, 2]
)

// Obter categorias únicas por ordem alfabética
assert.deepEqual(
  categories(sample),
  ['acessórios', 'equipamento']
)

// Aplicar um desconto de 20%
const discounted = withDiscount(sample, 20)

assert.deepEqual(
  discounted.map((item) => item.price),
  [40, 12, 8]
)

// Confirmar que o desconto cria uma nova lista e novos objetos
assert.notStrictEqual(discounted, sample)

discounted.forEach((item, index) => {
  assert.notStrictEqual(item, sample[index])
})

// Ordenar do menor preço para o maior
const ascending = sortByPrice(sample, 'asc')

assert.deepEqual(
  ascending.map((item) => item.price),
  [10, 15, 50]
)

// Ordenar do maior preço para o menor
const descending = sortByPrice(sample, 'desc')

assert.deepEqual(
  descending.map((item) => item.price),
  [50, 15, 10]
)

// Confirmar que a ordenação devolve novas listas
assert.notStrictEqual(ascending, sample)
assert.notStrictEqual(descending, sample)

// Ordenar uma lista vazia
assert.deepEqual(sortByPrice([], 'asc'), [])
assert.deepEqual(sortByPrice([], 'desc'), [])

// Confirmar que nenhuma função alterou os dados originais
assert.deepEqual(sample, original)

console.log('Todos os testes passaram.')