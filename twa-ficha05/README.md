# Ficha 05 — Componentes e formulários

Catálogo da loja da equipa, a partir da nossa Ficha 04.
Reutiliza `catalog.js`, `items.json` e `check.js` sem alterações.

## Executar

No terminal do Windows:

```cmd
cd /d "C:\Users\Sancler\Desktop\Tecnlogias Web\twa-ficha05"
npm.cmd install
npm.cmd run dev
```

Abrir o endereço indicado pelo Vite. Para testar e compilar:

```cmd
node check.js
npm.cmd run build
```

## O que está feito

- `App.vue` mantém os produtos, os filtros, a ordenação e a seleção.
- `ItemList.vue` recebe `items` e `selectedId` por props e emite `select` com o ID.
- `ItemDetail.vue` recebe o produto e apresenta nome, preço, tags e detalhes. Produtos novos sem cor ou tamanho apresentam uma indicação de campo não preenchido.
- `ItemForm.vue` mantém um rascunho reactive, recebe categorias por prop, usa `v-model.trim` e `.number`, valida com `errors` e `isValid` e emite `save` com um objeto novo. O pai atribui o próximo ID e adiciona o produto; o formulário é limpo depois de guardar.
- O nome deve ter pelo menos 3 caracteres, a categoria deve ser selecionada e o preço deve ser maior que zero, com no máximo duas casas decimais. Há mensagens por campo, botão desativado e verificação dentro de `save()`.
- `useLoad` gere os estados de carregamento, erro e sucesso; chama o carregamento em `onMounted`. `getJSON` verifica a resposta HTTP e lê o JSON. O botão de tentar novamente reutiliza `load`.
- Um `watch(query)` limpa a seleção quando a pesquisa muda.
- Os filhos não alteram as props. Os nomes são apresentados por interpolação, sem interpretar HTML.

Os produtos adicionados existem apenas em memória e desaparecem ao recarregar a página.
A pesquisa e a categoria continuam a filtrar os novos produtos, pelo que podem ocultá-los.

## Verificar no browser

- Selecionar um produto e escrever na pesquisa: o detalhe deve desaparecer.
- Limpar os filtros e adicionar um produto com preço 5: deve ficar no fim em ordem descendente e no início em ordem ascendente.
- Confirmar que nome vazio, nome curto, categoria vazia e preço 0 impedem a gravação.
- Usar tags como `oficial, treino`: o detalhe deve mostrar as tags separadas.
- Adicionar `<b>olá</b>` como nome: deve aparecer literalmente, sem negrito.
- Confirmar que o formulário fica vazio depois de adicionar e que IDs diferentes permitem selecionar cada produto.
- Simular uma resposta HTTP 404 nas ferramentas do browser e confirmar a mensagem de erro; remover a simulação e usar Tentar novamente.

## Uso de IA

Usei o ChatGPT para me ajudar nesta ficha.
