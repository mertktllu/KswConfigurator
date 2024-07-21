module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://kswconfigurator-7fc475022be0.herokuapp.com', // Heroku URL'niz
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  };
  