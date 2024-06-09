import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import path, { resolve, join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: ["electron/index.ts", "electron/preload.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8899,
  }
});
