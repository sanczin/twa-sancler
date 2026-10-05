import assert from 'node:assert/strict'
import {
  byCategory,
  search,
  total,
  top,
  categories,
  withDiscount
} from './catalog.js'

const sample = [
  {
    id: 1,
    name: 'Camisola',
    category: 'equipamento',
    price: 50,
    tags: ['oficial']
  },
  {
    id: 2,
    name: 'Cachecol',
    category: 'acessórios',
    price: 15,
    tags: ['inverno']
  },
  {
    id: 3,
    name: 'Meias',
    category: 'equipamento',
    price: 10,
    tags: ['oficial']
  }
]

const original = structuredClone(sample)

assert.deepEqual(
  byCategory(sample, 'equipamento').map((item) => item.id),
  [1, 3]
)

assert.deepEqual(
  search(sample, 'CAMI').map((item) => item.id),
  [1]
)

assert.deepEqual(
  search(sample, 'INVER').map((item) => item.id),
  [2]
)

assert.equal(total(sample), 75)

assert.deepEqual(
  top(sample, 2).map((item) => item.id),
  [1, 2]
)

assert.deepEqual(categories(sample), ['acessórios', 'equipamento'])

const discounted = withDiscount(sample, 20)

assert.deepEqual(
  discounted.map((item) => item.price),
  [40, 12, 8]
)

assert.notStrictEqual(discounted, sample)
discounted.forEach((item, index) => {
  assert.notStrictEqual(item, sample[index])
})

assert.deepEqual(sample, original)