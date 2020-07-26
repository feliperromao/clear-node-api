module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3', //! Attention to use the same production version of mongodb server
      skipMD5: true
    },
    autoStart: false,
    instance: {}
  }
}
