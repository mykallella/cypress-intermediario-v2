/*

  Cypress.Commands.add('login', (
    user = Cypress.env('user_name'), // se não for passado nada para o argumento 'user', atribui o valor default definido em cypress.env.json
    password = Cypress.env('user_password'),
  ) => {
    const login = () => {
      cy.visit('/users/sign_in') // baseUrl: 'http://localhost' (definido em cypress.config.js)
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }
  
    login()
  }) 

*/

  Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {}, 
  ) => {
    const login = () => { // Executa login comum (GUI)
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => { // Verifica se sessão está válida
      cy.visit('/')
      cy.location('pathname', { timeout: 1000 })
        .should('not.eq', '/users/sign_in') // Verifica se NÂO é igual
        // Se falhar
        // Se o pathname for igual a /users/sign_in, então reexecutará a função login
    }
  
    // DEFINIÇÃO DE USO DO CACHE
    const options = {
      cacheAcrossSpecs: true, // Defino que outros arquivos podem fazer login com cache
      validate,
    }
  
    if (cacheSession) { // Se cache for true... 
      cy.session(user, login, options) 
      // ID da sessão será o 'user', executa a função login usando o cache, e envia options
    } else {
      login() // Senão faz só a função login comum (GUI)
    }
  })
  
  Cypress.Commands.add('logout', () => { // * Lembrete: O logout invalida a sessão
    cy.get('.qa-user-avatar').click()
    cy.contains('Sign out').click()
  })
  
  Cypress.Commands.add('gui_createProject', project => {
    cy.visit('/projects/new')
  
    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  })
  
  Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
  })
  
  Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  })

  Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
  })