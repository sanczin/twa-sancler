import { writeFile } from 'node:fs/promises'
import { items } from './data.js'
import {
  byCategory,
  search,
  top,
  total,
  categories
} from './catalog.js'

const [cmd, arg] = process.argv.slice(2)

if (cmd === 'report') {
  const report = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3)
  }

  await writeFile(
    new URL('./report.json', import.meta.url),
    JSON.stringify(report, null, 2),
    'utf8'
  )

  console.log('Relatório guardado em report.json')
} else {
  let result = items

  if (cmd === 'search') {
    result = search(items, arg ?? '')
  } else if (cmd === 'top') {
    const n = Number(arg ?? 3)

    if (!Number.isInteger(n) || n < 0) {
      throw new Error('Indica uma quantidade inteira não negativa.')
    }

    result = top(items, n)
  } else if (cmd) {
    result = byCategory(items, cmd)
  }

  result.forEach((item) => {
    console.log(
      `${item.id} · ${item.name} · ${item.price.toFixed(2)} EUR`
    )
  })
}