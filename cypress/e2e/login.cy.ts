describe("check login page", () => {
  it("get username label", () => {
    cy.visit("http://localhost:8080/login");
    cy.get("label").should("have.text", "Username");
  }
});
