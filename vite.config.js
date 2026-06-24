import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use GITHUB_REPOSITORY env var during CI (e.g. "OsamaEllafi/wejha-website")
  // to produce the correct base path for GitHub Pages.
  // Falls back to '/' for local development.
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
  build: {
    cssMinify: 'esbuild',
  },
})
