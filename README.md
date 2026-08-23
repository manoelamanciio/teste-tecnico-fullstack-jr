# Mural de Enquetes ao Vivo

Aplicação full stack para criação de enquetes, registro de votos e atualização dos resultados em tempo real.

## Tecnologias

- PHP 8.3
- Laravel 11
- PostgreSQL 16
- React 18
- Node.js
- WebSocket com `ws`
- Docker Compose
- Laravel Sanctum

## Funcionalidades

- Criação de enquetes com duas ou mais opções
- Exibição da enquete mais recente
- Registro de votos
- Bloqueio de votos duplicados
- Atualização dos resultados em tempo real
- Autenticação da API com token
- Testes de integração do backend

## Estrutura

```text
backend/     API desenvolvida com Laravel
frontend/    Interface desenvolvida com React
websocket/   Servidor WebSocket desenvolvido com Node.js
docker/      Arquivos de configuração dos containers
```

## Como executar

### 1. Preparar os arquivos de ambiente

No PowerShell, execute na raiz do projeto:

```powershell
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

### 2. Construir os containers

```powershell
docker compose build
```

### 3. Instalar as dependências do Laravel

```powershell
docker compose run --rm --no-deps backend composer install
```

### 4. Iniciar o banco de dados

```powershell
docker compose up -d database
```

### 5. Gerar a chave da aplicação

```powershell
docker compose run --rm backend php artisan key:generate
```

### 6. Criar as tabelas e o usuário de desenvolvimento

```powershell
docker compose run --rm backend php artisan migrate --seed
```

O comando exibirá um token parecido com:

```text
API token: 1|token-gerado
```

Copie somente o conteúdo depois de `API token:`.

### 7. Configurar o token do frontend

Abra `frontend/.env` e informe o token:

```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TOKEN=COLE_O_TOKEN_GERADO
VITE_WEBSOCKET_URL=ws://localhost:8080
```

O arquivo `.env` não deve ser enviado para o Git.

### 8. Iniciar o backend e o WebSocket

```powershell
docker compose up -d backend websocket
```

### 9. Iniciar o frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

A API estará disponível em:

```text
http://localhost:8000/api
```

## Rotas da API

Todas as rotas exigem autenticação com Laravel Sanctum.

```text
GET  /api/polls/latest
POST /api/polls
POST /api/polls/{poll}/votes
```

## Executar os testes

Na raiz do projeto:

```powershell
docker compose run --rm backend php artisan test
```

## Decisões técnicas

O backend utiliza Laravel Sanctum para proteger as rotas da API. O PostgreSQL armazena as enquetes, opções e votos.

Cada navegador recebe um identificador salvo no `localStorage`. Esse identificador é enviado durante a votação e utilizado pelo backend para impedir votos duplicados na mesma enquete.

Depois de registrar um voto, o Laravel envia o resultado atualizado ao servidor Node.js. O servidor transmite a mensagem para os clientes conectados pelo WebSocket, permitindo a atualização da interface sem recarregar a página.

## Tempo de desenvolvimento

Aproximadamente 10 horas, incluindo configuração do ambiente, desenvolvimento, testes e documentação.

## Dificuldades encontradas

As principais dificuldades foram configurar a comunicação entre os containers, implementar a autenticação por token e integrar o Laravel ao servidor WebSocket. A implementação foi dividida em etapas menores para facilitar os testes e a identificação de erros.