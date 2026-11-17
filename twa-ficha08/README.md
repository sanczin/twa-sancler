# Ficha 08 - API REST com Express

Sancler Freitas - Tecnologias Web Avan�adas.

## Executar

```sh
cd twa-ficha08
npm install
npm run dev
```

API em http://localhost:3000. Noutro terminal, na mesma pasta:

```sh
node check.mjs
```

O check.mjs � uma verifica��o pr�pria, n�o o ficheiro fornecido pelo docente (n�o estava dispon�vel). Termina em sil�ncio quando passa e cria/apaga um produto de teste.

## Rotas

| M�todo | Caminho | Resposta |
|---|---|---|
| GET | /api/health | 200, estado e data |
| GET | /api/items | 200, lista; aceita ?q= no nome e tags |
| GET | /api/items/:id | 200, item; 404 se n�o existir |
| POST | /api/items | 201, item criado; 400 com errors se inv�lido |
| PUT | /api/items/:id | 200, substitui��o mantendo o ID do URL; 400/404 |
| DELETE | /api/items/:id | 204 sem corpo; 404 se n�o existir |

Nome: texto com pelo menos tr�s caracteres ap�s trim. Pre�o: n�mero positivo. Tags opcionais: lista de textos.
O logger corre antes do parser e das rotas; caminhos desconhecidos devolvem 404 em JSON. JSON malformado devolve 400 em JSON.

Os oito produtos e catalog.js foram copiados da Ficha 06. Por ser um cat�logo de futebol, ?q=puzzle devolve [] e o primeiro ID criado � 9 num arranque limpo, em vez dos valores ilustrativos 2 puzzles e ID 11 do PDF. Os IDs s�o atribu�dos pelo servidor.

Os dados s�o carregados uma vez e alterados em mem�ria. Reiniciar o servidor rep�e o JSON inicial. A API est� separada do frontend; a liga��o ser� feita na Aula 11. A Parte 4 est� no reposit�rio do grupo, na pasta server/.

## Uso de IA

Usei o ChatGPT/Codex em casa para interpretar o enunciado, implementar a API, preparar as verifica��es e documentar a ficha. A execu��o das verifica��es depende de instalar o Express e iniciar o servidor; consultar o estado de valida��o comunicado na entrega.
