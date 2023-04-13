import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import sass from "sass";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sass,
      },
    },
  },
});
