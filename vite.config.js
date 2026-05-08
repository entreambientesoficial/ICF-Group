import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',

  server: {
    port: 5173,
    open: '/dashboard.html',
    host: true, // expõe na rede local (útil para testar no celular)
  },

  preview: {
    port: 4173,
    open: '/dashboard.html',
  },

  // Multi-page app: todas as telas como entry points
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index:       resolve(__dirname, 'index.html'),
        dashboard:   resolve(__dirname, 'dashboard.html'),
        aula:        resolve(__dirname, 'aula.html'),
        calculadora: resolve(__dirname, 'calculadora.html'),
        comunidade:  resolve(__dirname, 'comunidade.html'),
        perfil:        resolve(__dirname, 'perfil.html'),
        certificado:   resolve(__dirname, 'certificado.html'),
        offline:       resolve(__dirname, 'offline.html'),
      },
    },
  },

})
