// login on frontend
Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {username, password})
    .then(({body}) => {
      cy.setCookie('token', body.token);
      cy.setCookie('name', body.name);
      cy.visit('');
    });
});