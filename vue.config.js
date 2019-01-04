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
    pwa: {
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
          // swSrc is required in InjectManifest mode.
          swSrc: 'src/service-worker.js',
          // ...other Workbox options...
      }
    },
}
