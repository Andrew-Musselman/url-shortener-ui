describe('main', () => {
    it('As a user, when I visit the page I should see the title and any existing shortend URLS', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 200,
            fixture: 'first-get'
        }).as('First Stub')
        cy.visit("http://localhost:3000")
        .get('h1').should('contain', 'URL Shortener').should('be.visible')
        .get('div[class="url"]').should('be.visible')
        .get('h3').should('contain', 'Awesome photo').should('be.visible')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/1').should('be.visible')
        .get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80').should('be.visible')
    })
    it('As a user, when I visit the page I should see an input form', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 200,
            fixture: 'first-get'
        }).as('First Stub')
        cy.visit("http://localhost:3000")
        .get('input[name="title"]').should('have.attr', 'placeholder', 'Title...').should('be.visible')
        .get('input[name="urlToShorten"]').should('have.attr', 'placeholder', 'URL to Shorten...').should('be.visible')
        .get('button').should('contain', 'Shorten Please!').should('be.visible')
    })
    it('As a user, as I type in the input fields they should hold the value of what I type', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 200,
            fixture: 'first-get'
        }).as('First Stub')
        cy.visit("http://localhost:3000")
        .get('input[name="title"]').type('New URL').should('have.value', 'New URL')
        .get('input[name="urlToShorten"]').type('https://example.com/a-new-url/10345886-985663').should('have.value', 'https://example.com/a-new-url/10345886-985663')
    })
    it('As a user, when I click the submit button it should post the new URL', () => {
        cy.visit("http://localhost:3000")
        .intercept('POST', 'http://localhost:3001/api/v1/urls', {
            status: 201,
            body: {
                title: 'New URL',
                long_url: 'https://example.com/a-new-url/10345886-985663'
            }
        }).as('Post')
        .intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 200, 
            fixture: 'second-get'
        }).as('second stub')
        .get('input[name="title"]').type('New URL')
        .get('input[name="urlToShorten"]').type('https://example.com/a-new-url/10345886-985663')
        .get('button').click()
        .get('div[class="url"]').last().should('be.visible')
        .should('contain', 'New URL')
        .should('contain', 'http://localhost:3001/useshorturl/2')
        .should('contain', 'https://example.com/a-new-url/10345886-985663')
    })
    it('As a user, If I try to submit without filling out both input fields I should see an error message', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 200,
            fixture: 'first-get'
        }).as('First Stub')
        cy.visit("http://localhost:3000")
        .get('button').click()
        .get('p[class="error"]').should('contain', 'Please fill out both inputs before submitting').should('be.visible')
    })
    it('As a user, I should see an error message if the server is down', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 500
        }).as('Error Stub')
        cy.visit("http://localhost:3000")
        .get('h2').should('contain', 'Something went wrong')
    })
})

// Last test not passing, but it works as expected in the browser???