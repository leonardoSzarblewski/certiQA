const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},

    retries: {
      runMode: 1, // Quantidade de tentativas extras para rodar os testes que falharam na pipeline
    },

    baseUrl: 'https://certiqa-qazando.com/',
  },
})
