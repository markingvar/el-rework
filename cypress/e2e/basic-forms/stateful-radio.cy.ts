import { faker } from "@faker-js/faker";
describe("Stateful Radio - Basic Functionality", () => {
  beforeEach(() => {});
});

it("Should be able to interact with a statful radio input", () => {
  cy.visit("http://localhost:3000/");
  cy.findByRole("link", { name: /Stateful Radio/ }).click();
  cy.findByLabelText("Yes").click();
  cy.findByLabelText("No").click();
  cy.findByLabelText("Yes").click();
  cy.findByLabelText("Maybe").click();
  cy.findByLabelText("Yes").click();
  cy.findByLabelText("Business Name").click().type(faker.company.companyName());
  cy.findByLabelText("Business Address")
    .click()
    .type(faker.address.streetAddress());

  cy.findByLabelText("Business Name")
    .click()
    .clear()
    .type(faker.company.companyName());
  cy.findByLabelText("Business Address")
    .click()
    .clear()
    .type(faker.address.streetAddress());
});
