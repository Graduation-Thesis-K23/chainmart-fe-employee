describe("check login page", () => {
  it("check input have type password", () => {
    cy.visit("/login");
    // sleep 5 seconds
    cy.wait(5000);
    cy.get("#basic_password").should("have.attr", "type", "password");
  });
});
