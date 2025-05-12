# E-commerce MVC (MVP)

Um projeto de e-commerce simples (MVP) implementado como um monorepo contendo front-end em Next.js/React e back-end em Node.js/Express, organizado com arquitetura **MVC**. O objetivo é demonstrar boas práticas de separação de camadas, modularidade e fluxo de dados entre cliente e servidor.

---

## 🛠️ Tecnologias

* **Next.js** (React) — front-end com páginas e rotas integradas
* **Node.js** + **Express** — back-end REST API
* **MongoDB** + **Mongoose** — banco de dados NoSQL e modelagem de dados
* **JavaScript** (ES6+)
* **CSS** puro — estilo limpo, sem frameworks externos
* **npm workspaces** — monorepo para gerenciar front e back juntos
* **React Context API** — gerenciamento de estado do carrinho

---

## 🔍 Arquitetura

O projeto segue o padrão **MVC**:

* **Models**: definição de esquemas (Mongoose) em `backend/models`
* **Views**: páginas React (Next.js) em `frontend/pages`
* **Controllers**: lógica de negócio em `backend/controllers`
* **Routes**: mapeamento de endpoints em `backend/routes`

O root contém um `package.json` configurado com workspaces (`backend` e `frontend`), além de scripts para rodar ambos simultaneamente.

---

## 📁 Estrutura de Pastas

```
/ecommerce-mvc/
├─ backend/          # API Node.js + Express
│   ├─ controllers/  # Lógica (controllers)
│   ├─ models/       # Esquemas Mongoose (models)
│   ├─ routes/       # Rotas da API
│   ├─ app.js        # Configuração do servidor Express
│   ├─ seed.js       # Script para popular a base de produtos
│   ├─ .env          # Variáveis de ambiente (ex: MONGO_URI)
│   └─ package.json  # Dependências e scripts do back-end
├─ frontend/         # Aplicação Next.js (front-end)
│   ├─ components/   # Componentes React (NavBar, etc.)
│   ├─ context/      # React Context API (CartContext)
│   ├─ pages/        # Páginas (Views): index.js, checkout.js
│   ├─ styles/       # CSS global e classes
│   └─ package.json  # Dependências e scripts do front-end
└─ package.json      # Workspaces e scripts do monorepo
```

---

## 🚀 Pré-requisitos

* Node.js (v16+)
* npm (v8+)
* MongoDB (local ou Atlas)

---

## 🏁 Como Executar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/archwes/ecommerce-mvc.git
   cd ecommerce-mvc
   ```

2. **Instale as dependências** (root com workspaces):

   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente**:

   * No diretório `backend`, crie um arquivo `.env`:

     ```env
     MONGO_URI=mongodb://localhost:27017/
     ```

4. **Popule o banco de dados**:

   * No diretório `backend`, abra o `Terminal` e digite:

   ```bash
   node seed.js
   ```

5. **Inicie em modo desenvolvimento**:

   ```bash
   npm run dev
   ```

   * Front-end disponível em [http://localhost:3000](http://localhost:3000)
   * API back-end em [http://localhost:3001](http://localhost:3001)

---

## 📦 Scripts Disponíveis

| Comando                            | Descrição                                 |
| ---------------------------------- | ----------------------------------------- |
| `npm install`                      | Instala todas as dependências do monorepo |
| `npm run dev`                      | Roda front e back em paralelo (dev)       |
| `npm run dev:frontend`             | Roda apenas o front-end (Next.js)         |
| `npm run dev:backend`              | Roda apenas o back-end (Express)          |
| `node seed.js`                     | Popula produtos de exemplo no MongoDB     |

---

## ✨ Funcionalidades

* **Catálogo de produtos** na homepage
* **Adicionar ao carrinho** com feedback imediato
* **NavBar** com contador de itens e link para checkout
* **Página de checkout** com formulário de compra e resumo de pedido
* **API REST** para produtos e pedidos

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
