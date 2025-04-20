// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'codemirror/lib/codemirror.css': path.resolve(__dirname, './node_modules/codemirror/lib/codemirror.css'),
      'codemirror/theme/material.css': path.resolve(__dirname, './node_modules/codemirror/theme/material.css'),
      'codemirror/mode/javascript/javascript': path.resolve(__dirname, './node_modules/codemirror/mode/javascript/javascript.js')
    }
  }
});