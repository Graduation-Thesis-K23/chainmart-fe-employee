describe("check login page", () => {
  it("check input have type password", () => {
    cy.visit("http://localhost:8080/login");
    cy.get("#basic_password").should("have.attr", "type", "password");
  });
});
