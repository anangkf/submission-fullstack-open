// login on frontend
Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {username, password})
    .then(({body}) => {
      cy.setCookie('token', body.token);
      window.localStorage.setItem('token', body.token);
      cy.setCookie('name', body.name);
      cy.visit('');
    });
});

Cypress.Commands.add('createBlog', ({title, author, url, likes}) => {
  const token = window.localStorage.getItem('token');

  cy.request({
    method: 'POST', 
    url: `${Cypress.env('BACKEND')}/blogs`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {title, author, url, likes}
  })
  cy.visit('');
});