# 📦 Projeto Full-Stack

**Libs utilizadas:**

(Back-end)

- Node.js
- Express.js
- Sequelize
- MySQL2
- JSON Web Token (JWT)
- BcryptJS
- CORS
- DotEnv
- Axios

(Front-end)

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- lucide-react

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Mistx144r/simple-userCRUD.git
cd simple-userCRUD
```

### 2. Instalar as dependências

```bash
npm i
```

### 3. Criar o arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` com as seguintes informações:

```env
DB_USER=root
DB_PASSWORD=123456
DB_NAME=meu_banco
JWT_SECRET=minha_chave_secreta
PORT=3000
```

### 4. Configurar o Vite

Dependendo do uso (rede local ou apenas máquina local), será necessário ajustar o arquivo `vite.config.js` na raiz do **frontend**:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": `http://localhost:${process.env.PORT || 3000}`, // Modifique Aqui Caso Va Usar Na Network!

      // Se for usar na rede local, troque pelo IP retornado pelo Vite (ou o IP que você desejar usar)
      //'/users': 'http://SEU_IP_DA_REDE:3000'
    },
  },
});
```

### 5. Rodar a aplicação

Abra **dois consoles distintos**:

#### Console 1 – Backend

```bash
npm run devmon
```

#### Console 2 – Frontend

- Para rodar localmente:

```bash
npm run dev
```

- Para expor na rede/localhost acessível por outros dispositivos:

```bash
npm run devhost
```

---

⚡ Pronto, a aplicação estará rodando!
