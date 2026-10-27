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

## Perguntas de reflexão

1. O `selectedId` pertence ao pai e a prop é só de leitura. O `ItemList` emite `select` para o pai decidir a alteração, mantendo um único dono do estado e tornando o filho reutilizável.
2. Uso `computed` para derivar um valor, como a lista visível, sem efeitos. Uso `watch` para executar um efeito quando um valor muda, como limpar a seleção ao pesquisar.
3. O `useLoad` evita repetir o estado de carregamento, os erros e a função de carregar nos seis ecrãs; cada chamada tem os seus refs. Se `onMounted` estivesse fora dele, cada componente teria de importar o hook e registar `onMounted(load)`.
4. O HTML dá validação imediata do browser; o computed aplica regras e controla mensagens e submissão. Ambos podem ser contornados. A validação da API protege os dados, porque verifica os pedidos no servidor.

## Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.
