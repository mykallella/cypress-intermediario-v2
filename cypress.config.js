const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true, // Esconde credenciais
      requestMode: true,
    },
    experimentalRunAllSpecs: true, // Permite executar todos os testes de uma vez em modo interativo
  },
  fixturesFolder: false,
  video: false,
})
