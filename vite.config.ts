import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      // 型定義を dist/types 以下に出力
      outDir: "dist/types",
      // package.json の types フィールドを自動更新したいなら true
      insertTypesEntry: false,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts", // エントリポイント
      name: "MyUiLibrary", // UMDビルド時のglobal変数名
      fileName: (format) => `my-ui-library.${format}.js`,
    },
    rollupOptions: {
      // React関連を外部化して、利用側でバンドルさせる
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true, // ソースマップ有効化（任意）
  },
});
