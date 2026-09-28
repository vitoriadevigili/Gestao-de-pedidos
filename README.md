# Gestão de Pedidos

Sistema de gestão de pedidos com cadastro de clientes, produtos e pedidos, autenticação por JWT e dashboard.

| Camada   | Tecnologia                                       | Porta  |
| -------- | ------------------------------------------------ | ------ |
| Banco    | PostgreSQL (schema `gestao_pedidos`)             | `5432` |
| Backend  | Java 21 + Spring Boot 3.5 (Maven)                | `8089` |
| Frontend | Angular 22 + PrimeNG                             | `4200` |

Repositório: https://github.com/vitoriadevigili/Gestao-de-pedidos

## Pré-requisitos

Instale antes de começar:

- **PostgreSQL** 14 ou superior (com `psql`, ou um cliente como pgAdmin/DBeaver)
- **JDK 21** (o Maven não precisa ser instalado: o projeto usa o Maven Wrapper `mvnw`)
- **Node.js** 22 LTS ou 24 LTS e **npm** 11 ou superior ─> https://nodejs.org/en/download

Para conferir:

```bash
psql --version
java -version
node -v
npm -v
```

## 1. Banco de dados

O backend espera o PostgreSQL rodando em `localhost:5432`, banco `postgres`, usuário `postgres` e senha `root`. Se o seu ambiente usar outros dados, ajuste em `backend/src/main/resources/application.yaml`.

**Não é preciso criar um banco novo.** O projeto usa o banco padrão `postgres`, que já existe em toda instalação do PostgreSQL. Todas as tabelas ficam isoladas dentro do schema `gestao_pedidos`:

```
postgres (banco padrão)
└── gestao_pedidos (schema)
    ├── usuario
    ├── cliente ──> endereco
    ├── produto
    ├── pedido ──> cliente
    └── produto_pedido ──> pedido, produto
```

### Restaurar o backup

O banco deve ser criado a partir do arquivo `dump_gestao_pedidos.sql`. Ele contém os **mesmos dados mostrados na apresentação** e monta toda a estrutura do zero:

1. o schema `gestao_pedidos`;
2. as tabelas, com chaves primárias, chaves estrangeiras e sequências de id;
3. os dados da apresentação (usuário, clientes e produtos).

Restaure o backup **antes** de iniciar o backend.

Na raiz do projeto, execute conectado ao banco `postgres`:

```bash
psql -h localhost -U postgres -d postgres -f dump_gestao_pedidos.sql
```

> Pelo pgAdmin/DBeaver: conecte no banco `postgres`, abra o arquivo `dump_gestao_pedidos.sql` no editor SQL e execute o script inteiro.

O dump deve ser executado em um banco **sem** o schema `gestao_pedidos`. Se ele já existir (por exemplo, de uma execução anterior) e você quiser recomeçar do zero, apague-o antes. **Isso remove todos os dados do projeto:**

```sql
DROP SCHEMA gestao_pedidos CASCADE;
```

## 2. Backend

```bash
cd backend
```

Windows (PowerShell / CMD):

```powershell
.\mvnw.cmd spring-boot:run
```

Linux / macOS / Git Bash:

```bash
./mvnw spring-boot:run
```

O comando compila e já inicia a API. Na primeira execução o Maven baixa as dependências, o que pode levar alguns minutos. A API está pronta quando aparecer `Started Application` no terminal e fica disponível em `http://localhost:8089`.

## 3. Frontend

Com o backend rodando, em outro terminal:

```bash
cd frontend
npm install
npm start
```

O `npm install` baixa as dependências (só é necessário na primeira vez) e o `npm start` compila e inicia o servidor de desenvolvimento. Quando aparecer `Local: http://localhost:4200/` no terminal, acesse esse endereço no navegador.

## Acesso

Para ver os dados da apresentação, faça login com o usuário que vem no backup:

| E-mail | Senha |
| ------ | ----- |
| `teste@gmail.com` | `Teste123` |

Cada usuário vê apenas os próprios clientes, produtos e pedidos. Uma conta nova criada pela tela de cadastro começa vazia.

