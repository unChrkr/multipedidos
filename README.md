# Reserva de Restaurante Multipedidos

Este projeto é uma aplicação de gerenciamento de reservas e cardápio, construída com NestJS, PostgreSQL e Prisma ORM no backend, e React no frontend. A aplicação permite criar reservas, cadastrar e fazer login de usuários, além de obter um cardápio com opções de pratos.

## Tecnologias Utilizadas

### Backend
- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados.
- **Prisma**: ORM (Object-Relational Mapping) para interação com o banco de dados.
- **Class Validator**: Para validação de dados de entrada.
- **Luxon**: Biblioteca para manipulação de datas e horas.
- **JWT (JSON Web Token)**: Para autenticação.
- **Bcrypt**: Para criptografia de senhas.
- **CORS**: Para gerenciar requisições e garantir segurança (apenas aceita requisições de localhost:3001).

### Frontend
- **React**: Biblioteca para construção da interface do usuário.
- **React Hook Form**: Para gerenciamento de formulários.
- **Zod**: Para validação de dados e gerenciamento de mensagens de erro.
- **Luxon**: Biblioteca para manipulação de datas e horas.
- **Material UI**: Componentes prontos para estilização e design da interface.
- **Redux**: Para gerenciamento de estado global da aplicação.

## Instalação

### Pré-requisitos
Antes de começar, verifique se você tem o Node.js e o PostgreSQL instalados em sua máquina.

### Passos para Instalação

#### Backend
1. Baixe o repositório para o seu computador.

link: 'https://github.com/unChrkr/multipedidos-teste.git'

2. Navegue até a pasta do backend.
3. Instale as dependências:
npm install


4. **Criar e popular o banco de dados**: Após instalar as dependências, execute o comando abaixo. Você será solicitado a inserir a senha do PostgreSQL. Este comando cria o banco de dados e popula com dados iniciais:
npm run populate

5. Inicie a aplicação:
npm run dev

#### Frontend
1. Navegue até a pasta do frontend.

2. Instale as dependências:
npm install

3. Inicie a aplicação:
npm run dev

## Rotas da API

### Criar Reserva
- **Método**: POST
- **Endpoint**: `/reservations`
- **Corpo da Requisição**:

```json
{
   "numberOfPeople": 4,
   "date": "2024-10-30T14:30:00"
}

Resposta:
json
{
    "id": 1,
    "numberOfPeople": 4,
    "dayTime": "2024-10-30T17:30:00.000Z",
    "userId": 9
}
Pegar Cardápio
Método: GET
Endpoint: /menu
Resposta:
json
[
    {
        "id": 1,
        "name": "Bruschetta",
        "description": "Pão grelhado coberto com tomates frescos, manjericão e alho.",
        "price": "7,99",
        "type": "starter"
    }
]
Cadastro de Usuário
Método: POST
Endpoint: /auth/register
Corpo da Requisição:
json
{
    "name": "boris",
    "email": "voris@mail.com",
    "password": "teste"
}
Resposta:
json
{
    "id": 9,
    "name": "boris",
    "email": "boris@mail.com"
}
Login de Usuário
Método: POST
Endpoint: /auth/login
Corpo da Requisição:
json
{
    "email": "boris@mail.com",
    "password": "teste"
}
Resposta:
json
{
    "token": "JWT_TOKEN_AQUI"
}

## Segurança
A aplicação foi configurada para aceitar requisições apenas de localhost:3001 utilizando CORS, garantindo uma camada adicional de segurança.