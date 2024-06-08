import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import viteLint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    viteLint({
      fix: true,
    })
  ],
  alias: {
    'vue': 'vue/dist/vue.esm-bundler.js'
  }
})
