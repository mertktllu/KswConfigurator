module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    pages: {
      index: {
        entry: 'MAN-front-proto/src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
      }
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        }
      }
    }
  };
  