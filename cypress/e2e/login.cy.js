import { faker } from '@faker-js/faker'

describe('login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('button', 'Login').click()
  })

  it('should log in successfully with valid credentials', () => {
    cy.login(Cypress.env('userActive'), Cypress.env('userPassword'))

    cy.contains('li', 'Login bem-sucedido').should('be.visible')
  })

  it('should display an error message when logging in with invalid credentials', () => {
    cy.get('#email').type(faker.internet.email())
    cy.get('#password').type(faker.internet.password())

    cy.contains('button', 'Entrar').click()

    cy.contains('li', 'Erro no login')
  })

  it('should display a validation alert when the password field is empty', () => {
    cy.get('#email').type(faker.internet.email())

    cy.contains('button', 'Entrar').click()
    cy.contains('p', 'Senha é obrigatória').should('be.visible')
  })

  it('should display a validation alert when the email field is empty', () => {
    cy.get('#password').type(faker.internet.password())

    cy.contains('button', 'Entrar').click()
    cy.contains('p', 'E-mail é obrigatório').should('be.visible')
  })

  it('should send a recovery email when the forgot password flow is completed', () => {
    cy.contains('a', 'Esqueceu a senha?').click()

    cy.get('#email').type(faker.internet.email())
    cy.contains('button', 'Enviar Link de Recuperação').click()
    cy.contains('li', 'E-mail enviado!').should('be.visible')

    cy.contains('button', 'Voltar ao Login').click()
  })

  it('Should successfully log out the user and return to the home screen', () => {
    cy.login(Cypress.env('userActive'), Cypress.env('userPassword'))
    cy.url().should('eq', 'https://certiqa-qazando.com/painel')

    cy.contains('button', 'Sair').click()
    cy.url().should('eq', 'https://certiqa-qazando.com/')
  })
})
