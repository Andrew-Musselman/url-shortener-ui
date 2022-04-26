describe('main', () => {
    it('As a user, when I visit the page I should see the title and any existing shortend URLS', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            status: 200,
            fixture: 'first-get'
        })
        cy.visit("http://localhost:3000")
    })
})