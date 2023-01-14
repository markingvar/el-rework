import { faker } from "@faker-js/faker";

describe("Basic Form - Text Input", () => {
  beforeEach(() => {});
});

it("Should be able to interact with the various text input fields", () => {
  cy.visit("http://localhost:3000/");
  cy.findByText("Text Input").click();

  cy.findByLabelText("Name")
    .click()
    .type(`${faker.name.firstName()} ${faker.name.lastName()}`);
  cy.findByLabelText("Description")
    .click()
    .type(`${faker.random.words(40)}!!?! (${faker.company.bs()})`);
  cy.findByLabelText("Password")
    .click()
    .type(faker.internet.password(26, false, /[\d\w!.*_?]/));
  cy.findByLabelText("Email").click().type(faker.internet.email());
});
