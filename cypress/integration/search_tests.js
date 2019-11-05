describe('Vimeo test', () => {

    beforeEach(() => {
        cy.fixture("users/test-user").as("user");
    });

    it('Should visit the site', () => {

        cy.visit('https://vimeo.com/');

        cy.request('https://vimeo.com')
            .then((response) => {
                expect(response).property('status').to.equal(200)
            });
    });

    it('Should auth user', function()  {

        cy
            .get('#nav-cta-login').as('logInButton')
            .click();

        cy
            .get('input[name="email"]')
            .type(this.user.email)
            .should("have.value", this.user.email);

        cy
            .get('input[name="password"]')
            .type(this.user.password)
            .should("have.value", this.user.password);

        cy
            .get(".js-email-submit").as('submitButton')
            .should("have.value", 'Log in with email')
            .click();

        cy.request('https://vimeo.com')
            .then((response) => {
                expect(response).property('status').to.equal(200)
            });

        cy.wait(2000).then((xhr) => {
            cy
                .getCookie('is_logged_in').should('have.property', 'value', '1')
                .getCookie('has_logged_in').should('have.property', 'value', '1')
        });
    });

    it('Search works correctly', function() {

        cy
            .get(".topnav_menu_search_input").as('searchInput')
            .type('Placebo{enter}')
            .wait(2000).then((xhr) => {
                cy.url().should('include', "/search?q=Placebo");
            });

        cy
            .scrollTo('bottom')
            .contains('Placebo - Infra Red');
    });

    it('Sharing link is equal to video\'s URL', function () {

        cy
            .contains('Placebo - Infra Red')
            .click();

        cy
            .get('.jivVNl').as('shareButton')
            .click()
            .get('input.share_link').as('shareLink')
            .should('have.value', 'https://vimeo.com/9686467')
            .get('a.undertaker').as('closeSharePopupButton')
            .click();
    });
});