describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);
    // creating new user
    const user = {
      name: "John Doe",
      username: "johnDoe",
      password: "johngantenk",
    };

    const anotherUser = {
      name: "Peter Drury",
      username: "peter",
      password: "petergantenk",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, anotherUser);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.visit("");
    cy.contains("log in to application");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("johnDoe");
      cy.get("#password").type("johngantenk");
      cy.get("#login-btn").click();
      cy.contains("John Doe logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("john-doe");
      cy.get("#password").type("johngantenk");
      cy.get("#login-btn").click();
      cy.contains("wrong username or password")
        .should("have.css", "border-bottom", "3px solid rgb(255, 17, 85)")
        .should("have.css", "color", "rgb(255, 17, 85)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "johnDoe", password: "johngantenk" });
    });

    it("A blog can be created", function () {
      // toggle blog form
      cy.contains("new blog").click();

      // add a new blog
      cy.get("#title").type("Testing with Cypress");
      cy.get("#author").type("Florian Nordeus");
      cy.get("#url").type("www.floriannordeus.com/blogs/testing-with-cypress");
      cy.get("button[type=submit]").click();

      // expect success notification to be shown
      cy.contains("a new blog Testing with Cypress by Florian Nordeus added")
        .should("have.css", "border-bottom", "3px solid rgb(56, 204, 56)")
        .and("have.css", "color", "rgb(56, 204, 56)");

      // expect new blog to be added to list
      cy.contains("Testing with Cypress Florian Nordeus");
    });

    describe("when blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "My First Blog",
          author: "Ross Bardainen",
          url: "www.ross-bardainen.com/blogs",
          likes: 2,
        });
      });

      it("User can like a blog", function () {
        cy.get(".blog").contains("show").click();
        cy.get('[data-cy="likes"]').should("contain", 2);
        cy.get('[data-cy="like-btn"]').click();
        cy.get('[data-cy="likes"]').should("contain", 3);
      });

      it("User who created the blog can delete it", function () {
        cy.get("button").contains("show").click();
        cy.contains("My First Blog");
        cy.get("button").contains("remove").click();
        cy.contains("My First Blog").should("not.exist");
      });
    });

    describe("when another user log in", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "My First Blog",
          author: "Ross Bardainen",
          url: "www.ross-bardainen.com/blogs",
          likes: 2,
        });
        cy.login({ username: "peter", password: "petergantenk" });
        cy.createBlog({
          title: "Peter's Blog",
          author: "Peter Drury",
          url: "www.peter-drury.com/blogs",
          likes: 1,
        });
      });

      it("user can't delete blog created by another user", function () {
        cy.contains("John Doe").parent().contains("show").click();
        cy.contains("John Doe").parent().should("not.contain", "remove");
        cy.contains("Peter Drury").parent().contains("show").click();
        cy.contains("Peter Drury").parent().should("contain", "remove");
      });
    });

    describe("When multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "My First Blog",
          author: "Ross Bardainen",
          url: "www.ross-bardainen.com/blogs",
          likes: 2,
        });
        cy.createBlog({
          title: "My Second Blog",
          author: "Ross Bardainen",
          url: "www.ross-bardainen.com/blogs",
          likes: 5,
        });
        cy.createBlog({
          title: "My Third Blog",
          author: "Ross Bardainen",
          url: "www.ross-bardainen.com/blogs",
          likes: 3,
        });
      });

      it("blogs are ordered according to likes with the blog with the most likes being first", function () {
        cy.get(".blog").eq(0).should("contain", "likes 5");
        cy.get(".blog").eq(1).should("contain", "likes 3");
        cy.get(".blog").eq(2).should("contain", "likes 2");
      });
    });
  });
});
