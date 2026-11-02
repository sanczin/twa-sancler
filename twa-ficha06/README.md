# Ficha 06 — Rotas e paginação

Continuação da minha Ficha 05, com os mesmos componentes `ItemList`, `ItemDetail` e `ItemForm`, o catálogo e os dados locais.

## Como executar

A partir da raiz do repositório:

```cmd
cd twa-ficha06
npm install
npm run dev
```

Abrir o endereço indicado pelo Vite.

## O que está feito

- `/`: catálogo com pesquisa, categoria e ordenação por preço.
- `/items/:id`: detalhe pelo ID do URL, com mensagem para produtos inexistentes.
- `/items/new`: formulário validado; guardar cria o produto e navega para o detalhe.
- `/pokemon?page=3`: PokéAPI paginada, 20 resultados por página, com Anterior/Seguinte e total calculado a partir de `count`.
- Rota 404 para caminhos desconhecidos e navegação interna com Vue Router.
- `store.js` partilhado: carrega `items.json` uma vez e mantém os produtos adicionados entre páginas. Recarregar repõe os dados iniciais.
- `App.vue` contém apenas a moldura, navegação e `RouterView`.
- Bónus C: o `useLoad` ignora respostas antigas ao paginar depressa e depois de desmontar a página.

A Parte 4 pertence ao repositório do grupo e não está incluída nesta pasta.

## Verificações

```cmd
node check.js
npm run build
```

O `check.js` mantém as verificações do catálogo e termina em silêncio quando passam.
Foram também verificados no browser: pesquisa, criação e validação de produtos, estado entre páginas, desaparecimento após reload, reload no detalhe, ID inexistente, rota 404, erro HTTP e nova tentativa, paginação com back/reload, botões nas pontas e apresentação em ecrã estreito.
A corrida entre pedidos foi verificada com respostas controladas e atrasadas; a ligação à PokéAPI foi também confirmada com dados reais.

Nota: o enunciado diz que a página 3 começa em `spearow`, mas `offset=40` devolve `zubat`. O código segue a fórmula indicada e a resposta real da API.
Em produção, o alojamento tem de servir `index.html` também nos caminhos das rotas, para permitir reload com `createWebHistory`.

## Perguntas de reflexão

1. Com um `ref` isolado, a página não fica no link: reload, partilha e back não recuperam a página escolhida sem sincronização adicional.
2. O store é um módulo partilhado e sobrevive à troca de páginas. O reload recria o estado em memória; no M2 a API e a base de dados permitem persistir e recuperar os produtos.
3. Ao entrar no detalhe vindo de `/`, o componente monta e `onMounted` carrega o store. Entre `/items/1` e `/items/2` é reutilizado: o computed sobre o ID atualiza o detalhe; se fosse necessário um fetch por ID, usaria um watch do parâmetro.
4. Para o projeto escolheria SPA: a interação corre no browser e o servidor fornece a API. Para as páginas institucionais públicas da ISLA escolheria SSG: HTML pronto na primeira pintura, bom SEO e alojamento estático; conteúdos atualizados por pedido podem justificar SSR e um servidor de renderização.

## Uso de IA

Usei o ChatGPT/Codex em casa para me ajudar a interpretar o enunciado, preparar o código, verificar a aplicação e redigir as respostas de reflexão.

## Referências

- [Vue Router — rotas dinâmicas e reutilização de componentes](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
- [PokéAPI — documentação](https://pokeapi.co/docs/v2#resource-listspagination-section)
