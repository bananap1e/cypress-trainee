describe('Vimeo test', () => {

    // Get user from fixtures/users
    beforeEach(() => {
        cy.fixture("users/test-user").as("user");
    });

    it('Should visit the site', () => {

        // Visit URL and check content on the page (i'll refactor it later for 200 response)
        cy.visit('https://vimeo.com/');

        cy.contains('Vimeo can help.*');
    });

    it('Should auth user', function()  {

        // Click on Log In button
        cy
            .get('#nav-cta-login')
            .click();

        // Enter e-mail
        cy
            .get('input[name="email"]')
            .type(this.user.email)
            .should("have.value", this.user.email);

        // Enter password
        cy
            .get('input[name="password"]')
            .type(this.user.password)
            .should("have.value", this.user.password);

        // Click on Log In button
        cy
            .get(".js-email-submit")
            .should("have.value", 'Log in with email')
            .click();

        // Check content on the page (i'll refactor it later for 200 response)
        cy.contains('Home');
    });

    it('Search works correctly', function() {

        // Click on search button
        cy
            .get(".topnav_menu_search_input")
            .type('Placebo{enter}');

        // Check URL
        cy.url().should('include', "/search?q=Placebo");

        // Scroll the page and find the video
        cy
            .scrollTo('bottom')
            .contains('Placebo - Infra Red');
    });

    it('Sharing link is equal to video\'s URL', function () {

        // Click on found video
        cy
            .contains('Placebo - Infra Red')
            .click();

        // Link in share button is equal to URL
        cy
            .get('.jivVNl')
            .click()
            .get('input.share_link')
            .should('have.value', 'https://vimeo.com/9686467')
            .get('a.undertaker')
            .click();
    });
});