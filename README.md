# Tecnologias Web Avançadas — Ficha 01

## twa-ficha01
Primeiro módulo JavaScript e consulta à API do GitHub.
Os dados obtidos são guardados em repo.json.

Para executar:
```cmd
cd twa-ficha01
node app.js
node api.js
```

## twa-vite
Aplicação criada com Vite e JavaScript.
O contador diminui a cada clique e atualiza o título do separador.

Para executar:
```cmd
cd twa-vite
npm install
npm run dev
```

Os comandos de cada projeto devem ser iniciados na pasta principal.



## Ficha 02 — Loja de uma equipa de futebol

Catálogo com oito produtos, organizado na pasta `twa-ficha02`.

### Executar

Entrar na pasta:
cd twa-ficha02

Listar todos os produtos:
node app.js

Filtrar por categoria:
node app.js t-shirt

Pesquisar no nome e nas tags:
node app.js search OFICIAL

Mostrar os três produtos mais caros:
node app.js top 3

Gerar report.json:
node app.js report

Executar os testes:
node check.js

### Uso de IA

Usei o ChatGPT para ajuda em alguns pontos desta tarefa.

## Ficha 03 — Loja de futebol no browser

Aplicação em JavaScript com Vite, na pasta `twa-ficha03`.

Os produtos são carregados de `public/items.json` com `fetch`.
A página permite pesquisar por nome e tags, filtrar por categoria,
ordenar por preço e consultar os detalhes de cada produto.

As funções da Ficha 02 são reutilizadas em `src/catalog.js`.
Foi acrescentada a função pura `sortByPrice`, que ordena os produtos
sem alterar a lista original.

A interface usa um estado central e uma função `render()`.
Os eventos alteram o estado e chamam essa função para atualizar a página.
Os dados são apresentados com `createElement` e `textContent`.

### Executar

A partir da pasta principal:

cd twa-ficha03
npm.cmd install
npm.cmd run dev

Abrir o endereço local indicado pelo Vite.

### Testes

Dentro de `twa-ficha03`:

node check.js

Foram verificados:
- Pesquisa e filtro por categoria.
- Ordenação por preço nas duas direções.
- Preservação dos dados originais.
- Detalhes do produto ao clicar.
- Estado de carregamento com Slow 4G.
- Mensagem de erro perante uma resposta HTTP 404.
- Apresentação de `<b>olá</b>` como texto, sem interpretar HTML.

### Uso de IA

Usei o ChatGPT para orientação e preparação da Ficha 03.