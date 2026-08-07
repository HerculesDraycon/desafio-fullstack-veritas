# Kanban - Desafio Fullstack (Veritas)
Esta aplicação é uma solução completa para o desafio de Estágio em Desenvolvimento Fullstack da Veritas Law.  Trata-se de uma aplicação WEB Kanban com backend em Go frontend em React.

Este projeto cumpre todos os requisitos do MVP proposto nos requisitos do desafio prático e implementa todas as funcionalidades, incluindo:
- Frontend em React que renderizar três colunas fixas (A Fazer, Em Progresso e Concluídas), permite adicionar, editar, mover e excluir tarefas, além de apresentar feedbacks visuais e consumir dados via API.
- Backend RESTful (CRUD) em Go, armazenamento em memória, validações básicas e configuração de CORS para permitir acesso pelo frontend.
- Funcionalidade de "Arrastar e Soltar" (Drag and Drop) as Tasks entre as colunas.
- Filtragem, Busca e Ordenação de Tasks tratadas no backend.
- Documentação de API e Endpoints com Swagger.
- Projeto todo disposto em Container com Docker e Docker Compose.

## Como rodar a aplicação:
A aplicação pode ser facilmente executada após o download do código encontrado nesse repositório.
### A. Com Docker (Recomendado)
Não exige a instalação de nada além do Docker Desktop na máquina.
#### Passo a passo:
1. Clone o repositório

    No diretório escolhido, execute:
    ```bash
    git clone https://github.com/HerculesDraycon/desafio-fullstack-veritas.git
    ```
2. Navegue até a raiz do projeto

    Onde se agrupam os diretórios de `frontend/` e `backend/`
    ```bash
    cd desafio-fullstack-veritas
    ```
3. Execute o comando Docker Compose

    Pela primeira vez ou após modificações no código:
    ```bash
    docker compose up --build
    ```
    Somente ligar o Container com build já feita:
    ```bash
    docker compose up
    ```
4. Acesse as interfaces de usuário dessa aplicação (com os containers rodando) com os seguintes links no seu navegador:

    **Frontend (UI/UX):** http://localhost:5173<br>
    **Backend (API Go):** http://localhost:8080<br>
    **Documentação (Swagger):** http://localhost:8080/swagger/index.html

### B. Executar Manualmente (Componentes Isolados)
Rodar o backend e o frontend em comandos isolados, o que requer a instalação de tecnologias específicas, pois não conta com Containers
#### Passo a passo:
1. Clone o repositório

    No diretório escolhido, execute:
    ```bash
    git clone https://github.com/HerculesDraycon/desafio-fullstack-veritas.git
    ```
2. Navegue até a raiz do projeto

    Onde se agrupam os diretórios de `frontend/` e `backend/`
    ```bash
    cd desafio-fullstack-veritas
    ```
3. Instalar o Go e o Swagger na máquina

    Link do instalador do GO: [Instalador GO Oficial](https://go.dev/doc/install)<br>
    Instalação do Swagger (Documentação das APIs):
    ```bash
       go install github.com/swaggo/swag/cmd/swag@latest
    ```
    ⚠️ Ao executar o backend manualmente ele podem ser exigidos mais módulos necessários. O padrão de instalação é o mesmo do apresentado sobre o Swagger, logo acima.
4. Rodando o Backend
    ```bash
    cd backend
    # Baixa as dependências listadas em go.mod
    go mod tidy
    # Caso queira acessar a documentação no Swagger
    swag init

    go run .
    ```
5. Rodando o Frontend

    Link do instalador do Node.js: [Instalador Node.js (LTS) Oficial](https://nodejs.org/en/download)
    Na raiz do projeto, em um segundo terminal (habilitado a executar comandos)
    ```bash
    cd frontend
    # Instala as dependências listadas no package.json
    npm install

    npm run dev
    ```
6. Acesse as interfaces de usuário dessa aplicação (com os terminais rodando) com os seguintes links no seu navegador:

    **Frontend (UI/UX):** http://localhost:5173<br>
    **Backend (API Go):** http://localhost:8080<br>
    **Documentação (Swagger):** http://localhost:8080/swagger/index.html

## Boas Práticas (Performance Técnica)
### Backend

### Frontend

### Infraestrutura



## Ideias de Melhorias Futuras

## Limitações Reconhecidas ?????