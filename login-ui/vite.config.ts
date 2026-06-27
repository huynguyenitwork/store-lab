import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // thêm tailwindcss
  plugins: [react(), tailwindcss()],
  resolve: {
    // Vite 8 tự động đồng bộ path từ tsconfig sang, cực kỳ mượt mà
    tsconfigPaths: true 
  }
})
