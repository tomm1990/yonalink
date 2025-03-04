import { pigment } from '@pigment-css/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createTheme } from '@mui/material';

/**
 * @type {import('@pigment-css/vite-plugin').PigmentOptions}
 */
// const pigmentConfig = {
//   transformLibraries: ['@mui/material'],
//   theme: createTheme({
//     cssVariables: true,
//   }),
// };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
