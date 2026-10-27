# Tecnologias Web Avançadas

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

## Ficha 04 — Catálogo em Vue

Aplicação Vue com Vite na pasta `twa-ficha04`.
Reutiliza sem alterações o `src/catalog.js`, o `public/items.json`
e o `check.js` da Ficha 03.

O `App.vue` tem um `ref` por campo do estado e valores derivados
com `computed`: produtos visíveis, categorias, produto selecionado e contador.
A pesquisa e a categoria usam `v-model`; a lista usa `v-for` com
`:key="item.id"`. O Vue atualiza a página quando o estado muda.
O carregamento trata erros HTTP e de leitura do JSON, com um botão para tentar novamente.
Os detalhes incluem nome, preço, tags, cor e tamanho.

### Executar

A partir da pasta principal:

```cmd
cd twa-ficha04
npm.cmd install
npm.cmd run dev
```

Abrir o endereço local indicado pelo Vite.

### Verificar

Dentro de `twa-ficha04`:

```cmd
node check.js
npm.cmd run build
```

Verificações no browser:

- Pesquisar pelo nome ou pelas tags e confirmar que o input mantém o foco.
- Combinar pesquisa e categoria, alternar a ordem dos preços e abrir os detalhes.
- Pesquisar algo inexistente para ver a mensagem sem resultados.
- Usar o botão de limpar e confirmar que a pesquisa fica vazia.
- Com Slow 4G nas ferramentas do browser, recarregar para observar o carregamento.
- Colocar temporariamente `<b>olá</b>` num nome do JSON e confirmar que aparece como texto; repor depois.
- Para simular HTTP 404, mudar temporariamente o caminho do fetch para `https://api.github.com/repos/nodejs/nope`, conforme o enunciado; repor o caminho e carregar em Tentar novamente.
- Com a extensão Vue DevTools, editar `query` no componente App e observar a lista.

Bónus B: contador de produtos visíveis e botão para limpar a pesquisa.

O README da entrega, incluindo as quatro respostas de reflexão, está em [twa-ficha04/README.md](twa-ficha04/README.md).

### Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.

## Ficha 05 — Componentes e formulários

Continuação do catálogo da Ficha 04, na pasta `twa-ficha05`.
A lista, o detalhe e o formulário estão separados em componentes.
Permite adicionar produtos com validação, mantendo a pesquisa e a ordenação.

A partir da pasta principal do repositório:

```cmd
cd twa-ficha05
npm install
npm run dev
```

Mais informações em [twa-ficha05/README.md](twa-ficha05/README.md).

### Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.
