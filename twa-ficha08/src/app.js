import express from 'express'
import itemsRouter from './items/router.js'

const app = express()
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})
app.use(express.json())
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }))
app.use('/api/items', itemsRouter)
app.use((req, res) => res.status(404).json({ error: 'Caminho não encontrado' }))
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' })
  }
  console.error(err)
  res.status(500).json({ error: 'Erro interno do servidor' })
})
app.listen(3000, () => console.log('http://localhost:3000'))
