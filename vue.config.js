module.exports = {
  publicPath:'./',
  configureWebpack: {
    mode: 'development',
    devServer: {
      // proxy: {
      //   "/api": {
      //     target: "http://139.199.64.35:3001",
      //     pathRewrite: { "^/api": "" }
      //   }
      // }
    }
  }
}