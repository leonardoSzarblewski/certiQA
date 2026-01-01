const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},

    retries: {
      runMode: 1, // Quantidade de tentativas extras para rodar os testes que falharam na pipeline
    },

    video: true,
    screenshotOnRunFailure: true,
    baseUrl: 'https://certiqa-qazando.com/',
  },
})
