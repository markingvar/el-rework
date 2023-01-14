describe("Basic Form - Select", () => {
  beforeEach(() => {});
});

it("Should be able to interact with a select input", () => {
  cy.visit("http://localhost:3000/");
  cy.findByText("Select").click();
  cy.get("#is-commercial-client").select("Yes");
  cy.get("#is-commercial-client").select("No");
  cy.get("#is-commercial-client").select("Maybe");
});
