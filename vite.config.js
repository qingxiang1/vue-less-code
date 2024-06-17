import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyLessVariables: lessVariables => {
          return {
            // 在这里定义或修改全局 Less 变量
            // 'primary-color': '#f00',
          };
        },
        // 引入外部Less文件作为变量
        additionalData: `@import "/public/variables.less";`,
      },
    },
  },
});