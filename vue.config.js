const { defineConfig } = require('@vue/cli-service')
const { VuetifyLoaderPlugin } = require('vuetify-loader')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
})
