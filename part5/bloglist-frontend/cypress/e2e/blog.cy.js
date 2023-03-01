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
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'johnDoe', password: 'johngantenk'});
    });

    it('A blog can be created', function() {
      // toggle blog form
      cy.contains('new blog').click();

      // add a new blog
      cy.get('#title').type('Testing with Cypress');
      cy.get('#author').type('Florian Nordeus');
      cy.get('#url').type('www.floriannordeus.com/blogs/testing-with-cypress');
      cy.get('button[type=submit]').click();

      // expect success notification to be shown
      cy.contains('a new blog Testing with Cypress by Florian Nordeus added')
        .should('have.css', 'border-bottom', '3px solid rgb(56, 204, 56)')
        .and('have.css', 'color', 'rgb(56, 204, 56)');

      // expect new blog to be added to list
      cy.contains('Testing with Cypress Florian Nordeus');
    });
  });
});