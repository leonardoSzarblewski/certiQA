import { faker } from '@faker-js/faker';

describe('login', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.contains('button', 'Login').click()
    });
    
    it('should log in successfully with valid credentials', () => {
        cy.clock()
        cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'))

        cy.contains('li', 'Login bem-sucedido').should('be.visible')
        cy.tick(5000)
    })

    it('should display an error message when logging in with invalid credentials', () => {
        cy.clock()

        cy.get('#email').type(faker.internet.email())
        cy.get('#password').type(faker.internet.password())

        cy.contains('button', 'Entrar').click()

        cy.contains('li', 'Erro no login')
        cy.tick(5000)
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
        cy.clock()

        cy.get('#email').type(faker.internet.email())
        cy.contains('button', 'Enviar Link de Recuperação').click()
        cy.contains('li', 'E-mail enviado!').should('be.visible')

        cy.tick(5000)

        cy.contains('button', 'Voltar ao Login').click()
    })

})