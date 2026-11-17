# Ficha 08 — API REST com Express

Sancler Freitas — Tecnologias Web Avançadas.

## Executar

```sh
cd twa-ficha08
npm.cmd install
npm.cmd run dev
```

API em http://localhost:3000. Noutro terminal, na mesma pasta:

```sh
npm.cmd test
```

O check.mjs é uma verificação própria, não o ficheiro fornecido pelo docente (não estava disponível). Termina em silêncio quando passa e cria/apaga um produto de teste.

## Rotas

| Método | Caminho | Resposta |
|---|---|---|
| GET | /api/health | 200, estado e data |
| GET | /api/items | 200, lista; aceita ?q= no nome e tags |
| GET | /api/items/:id | 200, item; 404 se não existir |
| POST | /api/items | 201, item criado; 400 com errors se inválido |
| PUT | /api/items/:id | 200, substituição mantendo o ID do URL; 400/404 |
| DELETE | /api/items/:id | 204 sem corpo; 404 se não existir |

Nome: texto com pelo menos três caracteres após trim. Preço: número positivo. Tags opcionais: lista de textos.
O logger corre antes do parser e das rotas; caminhos desconhecidos devolvem 404 em JSON. JSON malformado devolve 400 em JSON.

Os oito produtos e catalog.js foram copiados da Ficha 06. Por ser um catálogo de futebol, ?q=puzzle devolve [] e o primeiro ID criado é 9 num arranque limpo, em vez dos valores ilustrativos 2 puzzles e ID 11 do PDF. Os IDs são atribuídos pelo servidor.

Os dados são carregados uma vez e alterados em memória. Reiniciar o servidor repõe o JSON inicial. A API está separada do frontend; a ligação será feita na Aula 11.

## Uso de IA

Usei o ChatGPT/Codex em casa para interpretar o enunciado, implementar a API, preparar as verificações e documentar a ficha.

## Verificação

Em 17/11/2026, o servidor foi executado localmente e o comando `npm.cmd test` terminou sem erros. Foram verificadas as rotas GET, pesquisa, POST, PUT e DELETE, validações e respostas 404. O `check.mjs` incluído contém verificações próprias; não é o ficheiro oficial do docente.
