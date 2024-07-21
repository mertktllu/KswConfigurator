const { WebpackPluginVuetify } = require('webpack-plugin-vuetify');

module.exports = {
  configureWebpack: {
    plugins: [
      new WebpackPluginVuetify({
        // Vuetify plugin options
      }),
    ],
  },
};
