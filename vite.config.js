import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  optimizeDeps: {
    // exclude Rapier runtime pre-bundling so wasm is loaded at runtime intact
    exclude: ["@dimforge/rapier3d-compat", "@dimforge/rapier3d"]
  },
  assetsInclude: ["**/*.wasm"]
})
