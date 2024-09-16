import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";
import WindiCSS from "vite-plugin-windicss";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "vite-plugin-vue-setup-extend";

const resolve = (dir: string) => join(__dirname, dir);
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    vue(),
    WindiCSS(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    vueSetupExtend(),
  ],
  // 配置import.meta.env
  base: "/",
  css: {
    preprocessorOptions: {
      // 引入全局样式文件
      scss: {
        additionalData: '@import "/@/design/global.scss";',
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "/@": resolve("src"),
    },
  },
  // 生产环境打包配置
  // 去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    target: "es2015",
    cssTarget: "chrome80",
    outDir: "dist",
    assetsDir: "v20220526-112310",
    sourcemap: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
});
