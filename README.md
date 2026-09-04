# Sistema Just in Time

## Sobre o projeto

O **Sistema Just in Time** é uma aplicação web desenvolvida para auxiliar no gerenciamento de **produtos, pedidos e produção**.

O sistema permite que os usuários realizem seu acesso à aplicação, cadastrem e consultem produtos, realizem pedidos, registrem os itens pertencentes aos pedidos e acompanhem as operações de produção e movimentação realizadas no sistema.

A aplicação possui um back-end responsável pelo processamento das informações e pela comunicação com o banco de dados, além de um front-end responsável pela interface utilizada pelos usuários.


## Objetivo

Desenvolver um sistema web para auxiliar no gerenciamento das operações relacionadas a **produtos, pedidos e produção**, aplicando conceitos de desenvolvimento Full Stack, banco de dados, APIs e organização de sistemas.

O sistema tem como objetivo centralizar as informações e facilitar o registro e a consulta das operações realizadas pelos usuários.


## Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript

### Back-end

* Node.js
* Express.js
* JavaScript
* Prisma ORM
* `@prisma/client`
* `@prisma/adapter-mariadb`

### Banco de dados

* MySQL
* MariaDB
* XAMPP

### Ferramentas

* Visual Studio Code
* Git
* GitHub
* Google Chrome
* Insomnia


# Funcionalidades

## Autenticação de usuários

* Cadastro de usuários.
* Login de usuários cadastrados.
* Validação de e-mail e senha.
* Verificação das credenciais informadas.
* Controle de acesso às páginas do sistema.
* Identificação do usuário responsável pelas operações realizadas.



## Gerenciamento de produtos

* Cadastro de produtos.
* Listagem de produtos.
* Consulta dos produtos cadastrados.
* Busca de produtos.
* Edição de produtos.
* Exclusão de produtos.
* Validação dos dados dos produtos.


## Pedidos

* Cadastro de pedidos.
* Identificação do usuário responsável pelo pedido.
* Registro dos itens pertencentes ao pedido.
* Seleção de produtos para o pedido.
* Registro da quantidade solicitada.
* Consulta dos pedidos realizados.
* Associação dos pedidos aos respectivos usuários.


## Itens dos pedidos

Os itens permitem registrar quais produtos fazem parte de cada pedido.

São armazenadas informações relacionadas a:

* Pedido.
* Produto.
* Quantidade solicitada.

Dessa forma, um pedido pode possuir diferentes produtos e quantidades.



## Produção

* Cadastro de registros de produção.
* Identificação do produto produzido.
* Registro da quantidade produzida.
* Identificação do usuário responsável.
* Consulta dos registros de produção.

A produção permite registrar as operações relacionadas aos produtos que foram fabricados.


## Movimentações

O sistema possui um módulo para registrar as movimentações realizadas.

As movimentações permitem armazenar informações como:

* Produto relacionado.
* Usuário responsável.
* Tipo da movimentação.
* Quantidade.
* Data da movimentação.

As movimentações permitem consultar o histórico das operações registradas no sistema.


# Estrutura do projeto

```text
just_in_time_01_2026/
│
├── api/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── movimentacao.controller.js
│   │   │   ├── pedido.controller.js
│   │   │   ├── produto.controller.js
│   │   │   ├── producao.controller.js
│   │   │   └── usuario.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── movimentacao.routes.js
│   │   │   ├── pedido.routes.js
│   │   │   ├── produto.routes.js
│   │   │   ├── producao.routes.js
│   │   │   └── usuario.routes.js
│   │   │
│   │   └── ...
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── prisma.config.ts
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── web/
│   ├── index.html
│   ├── global.css
│   ├── index.js
│   │
│   ├── login.html
│   ├── root.css
│   ├── login.js
│   │
│   ├── producao.html
│   ├── producao.js
│   │
│   ├── produto.html
│   ├── produto.js
│   │
└── README.md


> A estrutura apresenta os principais arquivos e módulos utilizados no projeto.


# Banco de dados

O sistema utiliza o banco de dados:

sistema_estoque

A comunicação com o banco de dados é realizada no back-end utilizando o **Prisma ORM** e o adaptador MariaDB.

O banco de dados é executado localmente utilizando o **XAMPP**.

A configuração utilizada no projeto é baseada em:

Host: localhost
Usuário: root
Senha: vazia
Banco: sistema_estoque

# Principais entidades

O banco de dados possui entidades utilizadas para representar as informações do sistema, incluindo:

* `usuario`
* `produto`
* `pedido`
* `item`
* `producao`
* `movimentacao`

Essas entidades são relacionadas para permitir o registro dos usuários, produtos, pedidos, itens dos pedidos, produções e movimentações.


# Instalação

## 1. Clonar o repositório

git clone URL_DO_REPOSITORIO


Depois, entre na pasta do projeto:

cd just_in_time_01_2026


## 2. Instalar as dependências

Entre na pasta do back-end:

cd api

Instale as dependências:


npm install


# Configuração do banco de dados

## 1. Iniciar o XAMPP

Abra o **XAMPP** e inicie o serviço **MySQL**.

## 2. Criar o banco de dados

Crie o banco utilizado pelo sistema:

CREATE DATABASE sistema_estoque;

Depois execute o script SQL do projeto para criar as tabelas necessárias.


# Configuração do Prisma

O projeto utiliza o **Prisma ORM** para realizar a comunicação entre o back-end e o banco de dados.

A conexão utiliza o adaptador:

const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

A configuração da conexão utiliza:

const adapter = new PrismaMariaDb({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_estoque'
});

const prisma = new PrismaClient({ adapter });

# Executando o back-end

Entre na pasta da API:

cd api


Execute o servidor:

node server.js


O servidor será executado localmente em:

http://localhost:3000


# Executando o front-end

O front-end está localizado na pasta:

web/


Para executar a aplicação, abra o arquivo:

web/index.html


no navegador.

O front-end realiza as requisições para o back-end através da API:

http://localhost:3000

# Comunicação com a API

A comunicação entre o front-end e o back-end é realizada por meio de requisições HTTP.

Os principais métodos utilizados são:

GET
POST
PUT
DELETE

As informações são enviadas e recebidas no formato **JSON**.


# Rotas da API

## Usuários

Rotas relacionadas ao cadastro e autenticação dos usuários.


POST /usuario/cadastrar
POST /usuario/login


## Produtos

Rotas relacionadas ao gerenciamento dos produtos.


GET /produto/listar
POST /produto/cadastrar
PUT /produto/editar/:id
DELETE /produto/excluir/:id


## Pedidos

Rotas relacionadas aos pedidos realizados.

GET /pedido/listar
POST /pedido/cadastrar

## Itens

Os itens são utilizados para relacionar os produtos aos pedidos.

GET /item/listar
POST /item/cadastrar


## Produção

Rotas relacionadas aos registros de produção.

GET /producao/listar
POST /producao/cadastrar


## Movimentações

Rotas relacionadas ao registro e consulta das movimentações.


GET /movimentacao/listar
POST /movimentacao/cadastrar


> Os nomes e caminhos das rotas devem seguir a configuração presente nos arquivos `routes` do projeto.


# Validações

O sistema possui validações para evitar o cadastro de informações incorretas e manter a integridade dos dados.

Entre as validações estão:

* Verificação dos dados informados no cadastro.
* Validação das credenciais durante o login.
* Verificação da existência de usuários.
* Verificação da existência de produtos.
* Validação das informações dos pedidos.
* Validação dos itens relacionados aos pedidos.
* Validação das informações de produção.
* Validação das informações das movimentações.


# Testes

Foram realizados testes para verificar as principais funcionalidades do sistema.

Os testes estão relacionados aos **casos de uso e requisitos funcionais** definidos para o projeto.

Cada caso de teste possui informações como:

* Identificação do caso de teste.
* Objetivo.
* Pré-condições.
* Procedimentos.
* Resultado esperado.
* Resultado obtido.
* Status de aprovação.

Os testes têm como objetivo verificar se as funcionalidades implementadas estão de acordo com os requisitos definidos.


# Documentação

O projeto possui documentos relacionados à análise, desenvolvimento e validação do sistema, incluindo:

* Lista de Requisitos Funcionais.
* Casos de Uso.
* Descritivo dos Casos de Teste.
* Diagrama Entidade-Relacionamento (DER).
* Script SQL do banco de dados.
* Requisitos de infraestrutura.
* Documentação das interfaces do sistema.

Os requisitos funcionais são relacionados aos respectivos casos de uso e casos de teste, permitindo verificar a implementação das funcionalidades previstas no projeto.


# Finalidade acadêmica

O **Sistema Just in Time** foi desenvolvido como projeto acadêmico do **SENAI 2026**, com foco no desenvolvimento Full Stack e na aplicação prática de conceitos de:

* Desenvolvimento web.
* HTML, CSS e JavaScript.
* Node.js.
* Express.js.
* APIs REST.
* Prisma ORM.
* MySQL.
* Modelagem de banco de dados.
* Requisitos de software.
* Casos de uso.
* Testes de software.


# Sistema Just in Time

**Projeto acadêmico — SENAI 2026**

**Desenvolvimento Full Stack**
