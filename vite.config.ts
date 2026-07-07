import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 注意：需要安装 @types/node 才能用 path

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    tailwindcss()
  ], // 注册插件

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
