import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': `http://localhost:${process.env.PORT || 3000}`, // Modifique Aqui Caso Va Usar Na Network!

      // Se for usar na rede local, troque pelo IP retornado pelo Vite (ou o IP que você desejar usar),
      //'/users': 'http://SEU_IP_DA_REDE:3000'
    },
  },
})
