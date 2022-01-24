import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'funny',
      formats: ['umd'], // default：['es', 'umd']
      fileName: (format) => `${format}/index.js`
    }
  }
})
