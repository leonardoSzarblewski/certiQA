import { faker } from '@faker-js/faker';

describe('user sign-up', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('button', 'Cadastro').click()
    });

    it('Should register a user successfully', () => {
        cy.clock()
        cy.fillSignupForm()
        cy.contains('button', 'Cadastrar').click()

        /**Utilizar classes para validação não é uma boa prática, o recomendado neste cenário 
        seria um data-cy ou um id*/ 
        cy.get('.grid > .font-semibold').should('have.text', 'Cadastro realizado com sucesso!')

    })

    it('Should indicate that the name field is required', () => {
        cy.fillSignupForm()
        cy.get('#name').clear()
        cy.contains('button', 'Cadastrar').click()

        cy.contains('p', 'Nome é obrigatório').should('have.text', 'Nome é obrigatório')
    })

    it('Should indicate that the email field is required', () => {
        cy.fillSignupForm()
        cy.get('#email').clear()
        cy.contains('button', 'Cadastrar').click()

        cy.contains('p', 'E-mail é obrigatório').should('be.visible')
    })

    it('Should indicate that the password field is required', () => {
        cy.fillSignupForm()
        cy.get('#password').clear()
        cy.get('#confirmPassword').clear()
        cy.contains('button', 'Cadastrar').click()

        cy.contains('p', 'Senha é obrigatória').should('be.visible')
    })

    it('Should alert when passwords do not match', () => {
        cy.fillSignupForm()
        cy.get('#password').clear()
        cy.get('#password').type(faker.string.numeric(7))
        cy.contains('button', 'Cadastrar').click()

        cy.contains('p', 'As senhas não coincidem').should('be.visible')
    })

    it('Should indicate that passwords must have at least six characters', () => {
        const password = faker.string.numeric(5)

        cy.fillSignupForm()
        cy.get('#password').clear()
        cy.get('#confirmPassword').clear()

        cy.get('#password').type(password)
        cy.get('#confirmPassword').type(password)
        cy.contains('button', 'Cadastrar').click()

        cy.contains('p', 'Senha deve ter pelo menos 6 caracteres').should('be.visible')
    })

    it('Should alert when an invalid student code is provided', () => {
        cy.fillSignupForm()
        cy.get('#studentCode').type(faker.string.numeric(3))

        cy.contains('button', 'Cadastrar').click()

        /**Utilizar classes para validação não é uma boa prática, o recomendado neste cenário 
        seria um data-cy ou um id*/ 
        cy.get('.opacity-90').should('have.text', 'Erro ao verificar código do aluno')
        
    })
})