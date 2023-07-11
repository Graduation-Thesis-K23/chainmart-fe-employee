describe("check login page", () => {
  it("check input have type password", () => {
    cy.visit("/login");
    cy.get("#basic_password").should("have.attr", "type", "password");
  });
});
