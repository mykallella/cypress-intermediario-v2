describe('Logout', () => {
    beforeEach(() => {
      cy.login() // COMANDO CUSTOMIZADO
      cy.visit('/') // baseUrl: 'http://localhost' (definido em cypress.config.js)
    })
  
    it('successfully' , () => {
      cy.logout() // COMANDO CUSTOMIZADO
  
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`) 
      // Verifico que ao fazer logout é redirecionado para página de login
    })
  })
  