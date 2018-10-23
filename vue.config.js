// vue.config.js
module.exports = {
    devServer: {
      proxy: {
        '//app': {
          target: 'http://localhost:5000/app/',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  }