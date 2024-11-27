
export default {
    build: {
      outDir: 'dist', // Default; change only if you want a different folder
    },
  };
// import { defineConfig } from 'vite';

// export default defineConfig({
//   optimizeDeps: {
//     include: ['socket.io-client'],  // Explicitly include for Vite to pre-bundle.
//   },
//   resolve: {
//     alias: {
//       // Point to ESM build directly to avoid misresolution
//       'socket.io-client': 'socket.io-client/socket.io.esm.js',
//     },
//   },
// });
