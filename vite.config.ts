import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      NODE_ENV: process.env.NODE_ENV,
      VITE_API_URL: process.env.VITE_API_URL,
    },
  },
});
