describe("Muli-item Step - Singular Item", () => {
  beforeEach(() => {});
});

it("Should be able to add/edit/delete an item", () => {
  cy.visit("http://localhost:3000/");
  cy.findByRole("link", { name: /Multi-Step Form/ }).click();
  cy.findByText("Todo List").click();
  cy.findByText("Not Important").click();
  cy.findByText("Todo List").click();
  cy.findByText("Less Important").click();
  cy.findByText("Todo List").click();
  cy.wait(50);
  cy.findByText("Add Item").click();
  cy.findByLabelText("Part #").type("New Item");
  cy.findByText("Description").click().type("Nice to have");
  cy.findByLabelText("Medium").click();
  cy.findByText("Confirm").click();
  cy.wait(50);
  cy.get('[data-test="edit-0"]').click();
  cy.findByLabelText("Part #").clear().type("Newer Item");
  cy.get('[data-test="todo-description"]').clear().type("Nicer to have");
  cy.findByLabelText("Low").click();
  cy.findByText("Confirm").click();
  cy.wait(50);
  cy.get('[data-test="edit-0"]').click();
  cy.findByText("Confirm").click();
  cy.wait(50);
  cy.get('[data-test="delete-0"]').click();
  cy.findByText("Cancel").click();
  cy.wait(50);
  cy.get('[data-test="delete-0"]').click();
  cy.findByText("Confirm Delete").click();

  cy.wait(50);
  cy.findByText("Add Item").click();
  cy.findByLabelText("Part #").type("New Item");
  cy.findByText("Description").click().type("Nice to have");
  cy.findByLabelText("Medium").click();
  cy.findByText("Confirm").click();
  cy.wait(50);
  cy.get('[data-test="edit-0"]').click();
  cy.findByLabelText("Part #").clear().type("Newer Item");
  cy.get('[data-test="todo-description"]').clear().type("Nicer to have");
  cy.findByLabelText("Low").click();
  cy.findByText("Confirm").click();
  cy.wait(50);
  cy.get('[data-test="edit-0"]').click();
  cy.findByText("Confirm").click();
  cy.wait(50);
  cy.get('[data-test="delete-0"]').click();
  cy.findByText("Cancel").click();
  cy.wait(50);
  cy.get('[data-test="delete-0"]').click();
  cy.findByText("Confirm Delete").click();
});
