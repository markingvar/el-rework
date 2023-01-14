describe("Basic Form - Radio", () => {
  beforeEach(() => {});
});

it("Should be able to interact with a radio input", () => {
  cy.visit("http://localhost:3000/");
  cy.findByText("Radio").click();
  cy.findByLabelText("Yes").click();
  cy.findByLabelText("Maybe").click();

  cy.findByText("Submit").click();
});
