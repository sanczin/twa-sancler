# Ficha 05 — Componentes e formulários

Nesta ficha continuei o catálogo da Ficha 04 e dividi a aplicação em componentes:

- `ItemList.vue`: lista os produtos e emite o evento de seleção.
- `ItemDetail.vue`: mostra os detalhes do produto selecionado.
- `ItemForm.vue`: permite adicionar produtos, valida os campos e limpa o formulário depois de guardar.

O estado principal fica no `App.vue`. Os filhos recebem dados por props e comunicam por eventos.
O carregamento dos dados fica no composable `useLoad`, com `onMounted` e tratamento de erros.
Um `watch` limpa a seleção quando a pesquisa muda.
Reutilizei o `catalog.js`, o `items.json` e o `check.js` da Ficha 04.
Os produtos adicionados ficam em memória e desaparecem ao recarregar a página.

## Como executar

A partir da pasta principal do repositório:

```cmd
cd twa-ficha05
npm install
npm run dev
```

Abrir no browser o endereço indicado pelo Vite.

## Verificações

Dentro de `twa-ficha05`:

```cmd
node check.js
npm run build
```

Verifiquei no browser a adição de produtos, a ordenação por preço, a validação do preço 0,
a limpeza do formulário e da seleção ao pesquisar e a apresentação de HTML como texto.

## Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.
