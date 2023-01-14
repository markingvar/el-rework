describe("Basic Form - Checkbox", () => {
  beforeEach(() => {});
});

it("Should be able to interact with a checkbox group", () => {
  cy.visit("http://localhost:3000/");
  cy.findByText("Checkbox Group").click();
  cy.findByLabelText("Turbot").click();
  cy.findByLabelText("Turbot 2").click();
  cy.findByLabelText("Turbot 3").click();
  cy.findByLabelText("Livery").click();
  cy.findByLabelText("Turbot").click();
  cy.findByLabelText("Turbot 2").click();
  cy.findByLabelText("Turbot 3").click();
  cy.findByLabelText("Livery").click();
  cy.findByLabelText("Turbot").click();
  cy.findByLabelText("Turbot 2").click();
  cy.findByLabelText("Turbot 3").click();
  cy.findByLabelText("Livery").click();
  cy.findByLabelText("Turbot").click();
  cy.findByLabelText("Turbot 2").click();
  cy.findByLabelText("Turbot 3").click();
  cy.findByLabelText("Livery").click();

  cy.findByText("Submit").click();
});
