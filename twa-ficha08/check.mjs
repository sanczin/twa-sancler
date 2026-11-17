// Verifica��es pr�prias: executar com o servidor ligado. Sil�ncio = sucesso.
import assert from 'node:assert/strict'
import { search } from './src/catalog.js'
const base = 'http://localhost:3000'
async function pedido(caminho, estado, method = 'GET', corpo) {
  const res = await fetch(base + caminho, {
    method,
    headers: corpo === undefined ? {} : { 'Content-Type': 'application/json' },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  })
  assert.equal(res.status, estado, `${method} ${caminho}`)
  if (estado === 204) { assert.equal(await res.text(), ''); return }
  assert.match(res.headers.get('content-type'), /application\/json/)
  return res.json()
}
assert.equal((await pedido('/api/health', 200)).ok, true)
const items = await pedido('/api/items', 200)
assert.ok(items.length >= 8)
// O cat�logo pessoal � de futebol; n�o cont�m os puzzles do exemplo do docente.
for (const q of ['puzzle', 'OFICIAL', 'Camisola', 'inexistente-xyz']) {
  assert.deepEqual(await pedido(`/api/items?q=${q}`, 200), search(items, q))
}
assert.deepEqual(await pedido(`/api/items/${items[0].id}`, 200), items[0])
assert.ok((await pedido('/api/items/999', 404)).error)
assert.ok((await pedido('/caminho-inexistente', 404)).error)
const erros = await pedido('/api/items', 400, 'POST', { name: 'a', price: 0 })
assert.ok(erros.errors.name && erros.errors.price)
await pedido('/api/items', 400, 'POST', { name: 123, price: 10 })
await pedido('/api/items', 400, 'POST')
const criado = await pedido('/api/items', 201, 'POST', { name: '  Produto de teste  ', price: 12, id: 999 })
try {
  assert.equal(criado.name, 'Produto de teste')
  assert.notEqual(criado.id, 999)
  assert.deepEqual(criado.tags, [])
  assert.deepEqual(await pedido(`/api/items/${criado.id}`, 200), criado)
  await pedido(`/api/items/${criado.id}`, 400, 'PUT', { name: '', price: -1 })
  const atualizado = await pedido(`/api/items/${criado.id}`, 200, 'PUT', { id: 888, name: 'Produto atualizado', price: 20 })
  assert.equal(atualizado.id, criado.id)
  assert.equal(atualizado.price, 20)
  await pedido('/api/items/999', 404, 'PUT', { name: 'Teste', price: 20 })
} finally {
  await pedido(`/api/items/${criado.id}`, 204, 'DELETE')
}
await pedido(`/api/items/${criado.id}`, 404)
await pedido(`/api/items/${criado.id}`, 404, 'DELETE')
