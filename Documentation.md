# 📜 Documentação backend - Anéis do Poder

## 📌 Visão Geral

Essa API foi desenvolvida utilizando **Fastify** como framework backend, **Prisma** como ORM para comunicação com o banco de dados e **React Query** no frontend para gerenciamento de estados assíncronos. O objetivo é gerenciar anéis de poder, respeitando limites específicos para cada tipo de portador.

## 🏗️ Arquitetura

A API segue a arquitetura **MVC (Model-View-Controller)** e está estruturada nas seguintes camadas:

### **1️⃣ Models (Camada de Modelos - Prisma ORM)**

- Representa a estrutura dos dados no banco de dados.
- Através do **Prisma**, define os modelos e relações entre tabelas.

### **2️⃣ Services (Camada de Serviços)**

- Contém toda a lógica de negócio.
- Interage diretamente com o **Prisma** para manipulação dos dados.
- Responsável por validações, regras de negócio e comunicação com o banco de dados.

### **3️⃣ Controllers (Camada de Controladores)**

- Controla as requisições e respostas HTTP.
- Valida os dados recebidos antes de repassá-los para a camada de **Service**.
- Retorna os dados ou mensagens de erro para o cliente.

### **4️⃣ Routes (Camada de Rotas)**

- Define os endpoints da API e vincula as funções do **Controller** a cada rota específica.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** + **Fastify** → Framework backend performático.
- **Prisma ORM** → Abstração do banco de dados.
- **SQLite** → Banco de dados.
- **TypeScript** → Tipagem estática para maior segurança.
- **React Query** → Gerenciamento de estados assíncronos no frontend.

---

## 🔄 Fluxo da Aplicação

1. O **usuário (frontend)** envia uma requisição HTTP para criar, listar, atualizar ou deletar um anel.
2. O **Controller** recebe a requisição, valida os dados e chama o **Service** correspondente.
3. O **Service** verifica as regras de negócio, acessa o **Prisma ORM** e interage com o **banco de dados**.
4. Após a operação, a resposta é enviada de volta ao **Controller**.
5. O **Controller** responde ao cliente com sucesso ou erro.

### **Diagrama do fluxo**

```plaintext
[Frontend] → [Controller] → [Service] → [Banco de Dados]
```

---

## 🛠️ Endpoints

### **1️⃣ Criar um Anel**

`POST /rings`

```json
{
  "name": "Anel dos Elfos",
  "power": "Invisibilidade",
  "bearer": 1
}
```

**Restrições:**

- Elfos: Máximo de **3** anéis.
- Anões: Máximo de **7** anéis.
- Homens: Máximo de **9** anéis.
- Sauron: Apenas **1** anel.

---

### **2️⃣ Listar todos os Anéis**

`GET /rings`

- Retorna um array com todos os anéis cadastrados.

---

### **3️⃣ Buscar um Anel por ID**

`GET /rings/:id`

- Retorna um único anel baseado no ID informado.

---

### **4️⃣ Atualizar um Anel**

`PUT /rings/:id`

```json
{
  "name": "Novo Nome",
  "power": "Novo Poder",
  "bearer": 2
}
```

---

### **5️⃣ Deletar um Anel**

`DELETE /rings/:id`

- Remove um anel específico do banco de dados.

---

## ⚙ Regras de Negócio
A API garante que a quantidade máxima de anéis respeite as seguintes regras:

| Portador | Máximo de Anéis |
|----------|----------------|
| Elfos    | 3              |
| Anões    | 7              |
| Homens   | 9              |
| Sauron   | 1              |

Caso o limite seja excedido, a criação é rejeitada com erro `400 Bad Request`.

---

# 📜 Documentação frontend - Anéis do Poder

## 📌 Visão Geral

Este documento detalha a estrutura do frontend do projeto, incluindo as tecnologias utilizadas, a organização das pastas, e as principais práticas adotadas para o desenvolvimento.

---

## ⚙️ Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Vite**: Ferramenta de build rápida para projetos em frontend.
- **React Query**: Gerenciamento de estado assíncrono para chamadas à API.
- **Ant Design (AntD)**: Biblioteca de componentes para estilização e design responsivo.

---

## 🏛 Estrutura de Pastas

```
frontend/
│-- src/
│   │-- api/           # Hooks para comunicação com a API usando React Query
│   │-- assets/        # Imagens, ícones e outros arquivos estáticos
│   │-- components/    # Componentes reutilizáveis
│   │-- types/         # Definição de tipos e interfaces para melhor tipagem do projeto
│   │-- utils/         # Funções utilitárias e helpers
│   │-- app.tsx        # Componente raiz do React
|   |-- app.css        # Estilos globais da aplicação
│-- package.json       # Dependências e scripts do projeto
│-- tsconfig.json      # Configuração do TypeScript
│-- README.md          # Documentação do frontend
```

---

## React Query

Utilizamos **React Query** para o gerenciamento de estado assíncrono e cache de requisições HTTP. Os hooks personalizados estão dentro da pasta `api/` e seguem a estrutura:

```ts
import { useQuery } from "@tanstack/react-query";

const fetchRings = async () => {
  const response = await fetch("http://localhost:3000/rings");
  if (!response.ok) {
    throw new Error("Erro ao buscar os anéis");
  }
  return response.json();
};

export const useGetRings = () => {
  return useQuery({ queryKey: ["rings"], queryFn: fetchRings });
};
```
---

## Ant Design

O **Ant Design (AntD)** é usado para criar componentes estilizados, como botões, modais e tabelas.

Exemplo de uso com um `Modal`:

```tsx
import { Modal, Button } from "antd";
import { useState } from "react";

const ExampleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Abrir Modal
      </Button>
      <Modal
        title="Exemplo de Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        Conteúdo do Modal
      </Modal>
    </>
  );
};

export default ExampleModal;
```
---

## Boas Práticas

- **Organização modular**: Cada pasta tem um papel específico no projeto.
- **React Query** para evitar estados desnecessários e melhorar performance.
- **TypeScript** para tipagem e segurança do código.
- **Uso de AntD** para garantir um design consistente e responsivo.

---

## Como Rodar o Projeto

```sh
# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

---

## 📬 Contato

Caso tenha dúvidas ou sugestões, entre em contato:
📧 limacleyton82@gmail.com  
👨‍💻 [GitHub](https://github.com/Cleyton-Honorato)

---

🛠️ **Happy Coding!** 🚀
