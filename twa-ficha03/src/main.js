import {
  search,
  byCategory,
  categories,
  sortByPrice,
} from './catalog.js'

const q = document.querySelector('#q')
const category = document.querySelector('#category')
const sort = document.querySelector('#sort')
const status = document.querySelector('#status')
const list = document.querySelector('#list')
const detail = document.querySelector('#detail')

const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
}

function render() {
  if (state.status === 'loading') {
    status.textContent = 'A carregar…'
    list.replaceChildren()
    detail.replaceChildren()
    return
  }

  if (state.status === 'error') {
    status.textContent = `Erro: ${state.error}`
    list.replaceChildren()
    detail.replaceChildren()
    return
  }

  const categoryOptions = categories(state.items).map((name) => {
    const option = document.createElement('option')
    option.value = name
    option.textContent = name
    return option
  })

  const allOption = document.createElement('option')
  allOption.value = ''
  allOption.textContent = 'Todas as categorias'

  category.replaceChildren(allOption, ...categoryOptions)
  category.value = state.category

  const filtered = state.category === ''
    ? state.items
    : byCategory(state.items, state.category)

  const searched = search(filtered, state.query)
  const visible = sortByPrice(searched, state.sortDir)

  sort.textContent = state.sortDir === 'desc'
    ? 'Preço: maior para menor'
    : 'Preço: menor para maior'

  status.textContent = visible.length === 0
    ? 'Sem resultados.'
    : `${visible.length} produtos encontrados.`

  const nodes = visible.map((item) => {
    const li = document.createElement('li')
    li.dataset.id = item.id

    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = `${item.name} — ${item.price.toFixed(2)} €`

    li.append(button)
    return li
  })

  list.replaceChildren(...nodes)

  const selected = state.items.find(
    (item) => item.id === state.selectedId
  )

  detail.replaceChildren()

  if (selected) {
    const title = document.createElement('h2')
    title.textContent = selected.name

    const price = document.createElement('p')
    price.textContent = `Preço: ${selected.price.toFixed(2)} €`

    const tags = document.createElement('p')
    tags.textContent = `Tags: ${selected.tags.join(', ')}`

    const color = document.createElement('p')
    color.textContent = `Cor: ${selected.details.color}`

    const size = document.createElement('p')
    size.textContent = `Tamanho: ${selected.details.size}`

    detail.append(title, price, tags, color, size)
  }
}

async function load() {
  state.status = 'loading'
  state.error = null
  render()

  try {
    const res = await fetch('/items.json')

    if (!res.ok) {
      throw new Error(
        `Não foi possível carregar os produtos (HTTP ${res.status}).`
      )
    }

    state.items = await res.json()
    state.status = 'ready'
  } catch (err) {
    state.error = err.message
    state.status = 'error'
  } finally {
    render()
  }
}

q.addEventListener('input', (e) => {
  state.query = e.target.value
  render()
})

category.addEventListener('change', (e) => {
  state.category = e.target.value
  render()
})

sort.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render()
})

list.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-id]')

  if (!li) return

  state.selectedId = Number(li.dataset.id)
  render()
})

load()