import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', (email, password) => {
    cy.get('#email').type(email)
    cy.get('#password').type(password)
        
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('fillSignupForm', () => {
   const password = faker.string.numeric(6)

    cy.get('#name').type(faker.person.fullName())
    cy.get('#email').type(faker.internet.email())
    cy.get('#password').type(password)
    cy.get('#confirmPassword').type(password)

})

