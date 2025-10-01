/* This JavaScript code snippet is configuring a Vite project, which is a build tool for modern web
development. Here's a breakdown of what each part of the code is doing: */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
