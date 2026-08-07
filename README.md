# Kanban - Desafio Fullstack (Veritas)
Esta aplicação é uma solução completa para o desafio de Estágio em Desenvolvimento Fullstack da Veritas Law.  Trata-se de uma aplicação WEB Kanban com backend em Go e frontend em React. **Confira o User-flow elaborado:** [Kanban User-flow](https://github.com/HerculesDraycon/desafio-fullstack-veritas/tree/main/docs/user-flow.png)

Este projeto cumpre todos os requisitos do MVP propostos no desafio prático e implementa todas as funcionalidades, incluindo:
- Frontend em React que renderiza três colunas fixas (A Fazer, Em Andamento e Concluídas), permite adicionar, editar, mover e excluir tarefas, além de apresentar feedbacks visuais e consumir dados via API.

- Backend RESTful (CRUD) em Go, armazenamento em memória, validações básicas e configuração de CORS para permitir requisições do frontend.

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

    Onde se agrupam os diretórios `frontend/`, `backend/` e `docs/`
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

    Onde se agrupam os diretórios `frontend/`, `backend/` e `docs/`
    ```bash
    cd desafio-fullstack-veritas
    ```
3. Instalar o Go e o Swagger na máquina

    Link do instalador do GO: [Instalador GO Oficial](https://go.dev/doc/install)<br>
    Instalação do Swagger (Documentação das APIs):
    ```bash
       go install github.com/swaggo/swag/cmd/swag@latest
    ```
    ⚠️ Ao executar o backend manualmente, podem ser exigidos mais módulos necessários e o padrão de instalação é o mesmo do apresentado sobre o Swagger, executando o comando no diretório `backend/`. Existe a possibilidade de que o terminal não reconheça o comando `go` por não encontrar onde ele foi instalado na máquina.
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

## Boas Práticas Usadas (Performance Técnica)
### Backend
- Pesquisa das Tasks. Foi implementada no Header do frontend uma barra de pesquisas que a cada determinado intervalo, dispara uma Query de dados que são tratados e devolvidos pelo backend em resposta a pesquisa pelo título da Task.

- Validação. Utilizando o `go-playground/validator` para validar payloads de entrada (DTOs), regras como required,min=3 (para o uma string) e oneof (para status) garantem a integridade dos dados antes que eles alcancem o processamento interno.

- Arquitetura Limpa. Foi implementado o Padrão Repositório (Repository Pattern) com a lógica de negócios em `handlers.go` que depende de uma interface `data.go` e não da implementação como um todo. Isso torna o código fácil de testar e permite trocar o Banco de Dados em memória por um banco externo (como PostgreSQL) futuramente, exigindo poucas alterações.

- Prevenção de processos concorrentes. Como o armazenamento dos dados está na memória primária e o Go lida com requisições concorrentes (goroutines), foi utilizado um `sync.RWMutex`. Isso previne disputas no recurso compartilhado, garantindo que o quadro de Tasks possa ser lido ou escrito por múltiplos usuários sem nenhum problema.

- Ordenação e Filtro de Tasks. Processada no backend (server-side), a lógica de filtragem busca objetos da categoria e a ordenação dispõe de opções para organizá-los. O Go recebe parâmetros na Query (ex: ?priority=high&sort=priority_grw) e faz o devido tratamento. Uma arquitetura escalável, que mantém o frontend eficiente.

- Documentação das APIs. A API está documentada com a biblioteca swaggo do Go, gerando uma UI interativa do Swagger.

### Frontend
- Modularização. Os componentes de UI foram implementados de forma dedicada à sua função e reutilizáveis (ex: Header, Collumn, TaskCard), mantendo o App.js totalmene limpo, apenas chamando as página, que também foram organizadas de forma individual no diretório `pages/`.

- Debouncing. A barra de pesquisa utiliza um *debounce* de 300ms. Isso evita que o frontend envie uma requisição para a API a cada tecla digitada, melhorando a performance.

- Drag and Drop. Foi implementada a funcionalidade de "arrastar e soltar" usando a biblioteca @dnd-kit. O usuário move o card da Task e a UI atualiza instantaneamente, então, uma chamada axios.PUT é enviada ao backend para persistir a mudança de status.


### Infraestrutura
- Docker Compose. Os componentes do projetos são reunidos no arquivo docker-compose.yaml, permitindo que o backend e o frontend instalem suas dependências, rodem e se comuniquem com um único comando.

## Ideias de Melhorias Futuras
- Cadastrar Usuários. Implementar um sistema de autenticação e associar Tasks aos seus usuários específicos.

- Alertas sobre o prazo. Como o prazo da Task foi um atributo criado nesse projeto, uma implementação futura seria criar alertas no sistema, para Tasks que estão próximas do vencimento e adicionar uma divisão para Tasks Atrasadas.

- Testes. Com mais tempo disponível e a possibilidade de escalonar a produção, seriam implementados testes que garantam a integridade das *features* implementadas.
<br><br><br>

### Autor do Projeto:
[Hércules Sampaio Oliveira](https://www.linkedin.com/in/h%C3%A9rcules-sampaio-oliveira-7551b0274/) - Graduando em Ciência da Computação