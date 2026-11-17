# Tecnologias Web Avan�adas

Reposit�rio das fichas individuais da unidade curricular de Tecnologias Web Avan�adas.
Cada ficha est� organizada na sua pasta, com os respetivos ficheiros e instru��es.

## twa-ficha01
Primeiro m�dulo JavaScript e consulta � API do GitHub.
Os dados obtidos s�o guardados em repo.json.

Para executar:
```cmd
cd twa-ficha01
node app.js
node api.js
```

## twa-vite
Aplica��o criada com Vite e JavaScript.
O contador diminui a cada clique e atualiza o t�tulo do separador.

Para executar:
```cmd
cd twa-vite
npm install
npm run dev
```

Os comandos de cada projeto devem ser iniciados na pasta principal.



## Ficha 02 - Loja de uma equipa de futebol

Cat�logo com oito produtos, organizado na pasta `twa-ficha02`.

### Executar

Entrar na pasta:
cd twa-ficha02

Listar todos os produtos:
node app.js

Filtrar por categoria:
node app.js t-shirt

Pesquisar no nome e nas tags:
node app.js search OFICIAL

Mostrar os tr�s produtos mais caros:
node app.js top 3

Gerar report.json:
node app.js report

Executar os testes:
node check.js

### Uso de IA

Usei o ChatGPT para ajuda em alguns pontos desta tarefa.

## Ficha 03 - Loja de futebol no browser

Aplica��o em JavaScript com Vite, na pasta `twa-ficha03`.

Os produtos s�o carregados de `public/items.json` com `fetch`.
A p�gina permite pesquisar por nome e tags, filtrar por categoria,
ordenar por pre�o e consultar os detalhes de cada produto.

As fun��es da Ficha 02 s�o reutilizadas em `src/catalog.js`.
Foi acrescentada a fun��o pura `sortByPrice`, que ordena os produtos
sem alterar a lista original.

A interface usa um estado central e uma fun��o `render()`.
Os eventos alteram o estado e chamam essa fun��o para atualizar a p�gina.
Os dados s�o apresentados com `createElement` e `textContent`.

### Executar

A partir da pasta principal:

cd twa-ficha03
npm.cmd install
npm.cmd run dev

Abrir o endere�o local indicado pelo Vite.

### Testes

Dentro de `twa-ficha03`:

node check.js

Foram verificados:
- Pesquisa e filtro por categoria.
- Ordena��o por pre�o nas duas dire��es.
- Preserva��o dos dados originais.
- Detalhes do produto ao clicar.
- Estado de carregamento com Slow 4G.
- Mensagem de erro perante uma resposta HTTP 404.
- Apresenta��o de `<b>ol�</b>` como texto, sem interpretar HTML.

### Uso de IA

Usei o ChatGPT para orienta��o e prepara��o da Ficha 03.

## Ficha 04 - Cat�logo em Vue

Aplica��o Vue com Vite na pasta `twa-ficha04`.
Reutiliza sem altera��es o `src/catalog.js`, o `public/items.json`
e o `check.js` da Ficha 03.

O `App.vue` tem um `ref` por campo do estado e valores derivados
com `computed`: produtos vis�veis, categorias, produto selecionado e contador.
A pesquisa e a categoria usam `v-model`; a lista usa `v-for` com
`:key="item.id"`. O Vue atualiza a p�gina quando o estado muda.
O carregamento trata erros HTTP e de leitura do JSON, com um bot�o para tentar novamente.
Os detalhes incluem nome, pre�o, tags, cor e tamanho.

### Executar

A partir da pasta principal:

```cmd
cd twa-ficha04
npm.cmd install
npm.cmd run dev
```

Abrir o endere�o local indicado pelo Vite.

### Verificar

Dentro de `twa-ficha04`:

```cmd
node check.js
npm.cmd run build
```

Verifica��es no browser:

- Pesquisar pelo nome ou pelas tags e confirmar que o input mant�m o foco.
- Combinar pesquisa e categoria, alternar a ordem dos pre�os e abrir os detalhes.
- Pesquisar algo inexistente para ver a mensagem sem resultados.
- Usar o bot�o de limpar e confirmar que a pesquisa fica vazia.
- Com Slow 4G nas ferramentas do browser, recarregar para observar o carregamento.
- Colocar temporariamente `<b>ol�</b>` num nome do JSON e confirmar que aparece como texto; repor depois.
- Para simular HTTP 404, mudar temporariamente o caminho do fetch para `https://api.github.com/repos/nodejs/nope`, conforme o enunciado; repor o caminho e carregar em Tentar novamente.
- Com a extens�o Vue DevTools, editar `query` no componente App e observar a lista.

B�nus B: contador de produtos vis�veis e bot�o para limpar a pesquisa.

O README da entrega, incluindo as quatro respostas de reflex�o, est� em [twa-ficha04/README.md](twa-ficha04/README.md).

### Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.

## Ficha 05 - Componentes e formul�rios

Continua��o do cat�logo da Ficha 04, na pasta `twa-ficha05`.
A lista, o detalhe e o formul�rio est�o separados em componentes.
Permite adicionar produtos com valida��o, mantendo a pesquisa e a ordena��o.

A partir da pasta principal do reposit�rio:

```cmd
cd twa-ficha05
npm install
npm run dev
```

Mais informa��es em [twa-ficha05/README.md](twa-ficha05/README.md).

### Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.

## Ficha 06 - Rotas e pagina��o

Continua��o da Ficha 05, na pasta `twa-ficha06`, com Vue Router, estado partilhado e pagina��o da Pok�API pelo URL.

```cmd
cd twa-ficha06
npm install
npm run dev
```

Instru��es, verifica��es, respostas de reflex�o e declara��o de IA em [twa-ficha06/README.md](twa-ficha06/README.md).

## Ficha 08 - API REST com Express

API individual em [twa-ficha08/README.md](twa-ficha08/README.md), com GET, POST, PUT, DELETE, pesquisa, valida��o, Router e logger.

Uso de IA: ChatGPT/Codex em casa para implementar, preparar verifica��es e documentar a ficha.
