describe('Blog app', function() {
  beforeEach( function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`);
    // creating new user
    const user = {
      name: 'John Doe',
      username: 'johnDoe',
      password: 'johngantenk'
    };

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function() {
    cy.visit('');
    cy.contains('log in to application');
  });

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('johnDoe');
      cy.get('#password').type('johngantenk');
      cy.get('#login-btn').click();
      cy.contains('John Doe logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('john-doe');
      cy.get('#password').type('johngantenk');
      cy.get('#login-btn').click();
      cy.contains('wrong username or password')
        .should('have.css', 'border-bottom', '3px solid rgb(255, 17, 85)')
        .should('have.css', 'color', 'rgb(255, 17, 85)');
    });
  })
});