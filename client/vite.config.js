
export default {
    build: {
      outDir: 'dist', // Default; change only if you want a different folder
    },
    resolve: {
        alias: {
            'socket.io-client': 'socket.io-client/dist/socket.io.esm.js',
        },
    },
      
      
  };
  