describe('Blog app', function() {
  beforeEach( function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`);
    // const user = {
    //   name: 'John Doe',
    //   username: 'johnDoe',
    //   password: 'johngantenk'
    // };

    // cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function() {
    cy.visit('');
    cy.contains('log in to application');
  });
});