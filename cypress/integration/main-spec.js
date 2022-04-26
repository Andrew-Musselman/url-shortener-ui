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
        .get('input[name="title"]').should('have.attr', 'placeholder', 'Title...').should('be.visible')
        .get('input[name="urlToShorten"]').should('have.attr', 'placeholder', 'URL to Shorten...').should('be.visible')
        .get('button').should('be.visible')
    })
})