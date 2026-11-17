import { Router } from 'express'
import { readFile } from 'node:fs/promises'
import { search } from '../catalog.js'

const items = JSON.parse(await readFile(new URL('../../data/items.json', import.meta.url), 'utf8'))
let proximoId = Math.max(0, ...items.map(item => item.id)) + 1
const router = Router()

function validar(corpo) {
  const errors = {}
  if (typeof corpo?.name !== 'string' || corpo.name.trim().length < 3) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres'
  }
  if (typeof corpo?.price !== 'number' || !Number.isFinite(corpo.price) || corpo.price <= 0) {
    errors.price = 'O pre�o deve ser um n�mero maior do que zero'
  }
  if (corpo?.tags !== undefined && (!Array.isArray(corpo.tags) || corpo.tags.some(tag => typeof tag !== 'string'))) {
    errors.tags = 'As tags devem ser uma lista de textos'
  }
  return errors
}

router.get('/', (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : ''
  res.json(q ? search(items, q) : items)
})
router.get('/:id', (req, res) => {
  const item = items.find(item => item.id === Number(req.params.id))
  if (!item) return res.status(404).json({ error: 'Item n�o encontrado' })
  res.json(item)
})
router.post('/', (req, res) => {
  const errors = validar(req.body)
  if (Object.keys(errors).length) return res.status(400).json({ errors })
  const item = { tags: [], ...req.body, id: proximoId++, name: req.body.name.trim() }
  items.push(item)
  res.status(201).json(item)
})
router.put('/:id', (req, res) => {
  const indice = items.findIndex(item => item.id === Number(req.params.id))
  if (indice === -1) return res.status(404).json({ error: 'Item n�o encontrado' })
  const errors = validar(req.body)
  if (Object.keys(errors).length) return res.status(400).json({ errors })
  // PUT substitui os dados; o ID continua a ser o do endere�o.
  items[indice] = { tags: [], ...req.body, id: items[indice].id, name: req.body.name.trim() }
  res.json(items[indice])
})
router.delete('/:id', (req, res) => {
  const indice = items.findIndex(item => item.id === Number(req.params.id))
  if (indice === -1) return res.status(404).json({ error: 'Item n�o encontrado' })
  items.splice(indice, 1)
  res.status(204).end()
})
export default router
