import '../../cypress.config';

describe('template spec', () => {
  it('creates a master wallet', async () => {
    cy.visit('/');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');
    cy.get('button').click();
  })

  it('Generate new wallet', () => {
    const clock = cy.clock();
    cy.visit('/');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');
    cy.get('button').click();
    clock.wait(100);
    cy.get("[data-testid=generate-new-wallet]").click();
  });

  it('View private key', () => {
    const clock = cy.clock();
    cy.visit('/');
    clock.wait(200);
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');
    cy.get('button').click();

    cy.get('[data-testid="see-private-key"]').click();
    clock.wait(100);
    cy.get('[name="password"]').type('password');
    clock.wait(100);
    cy.get('[data-testid="submit-password"]').click();
    clock.wait(500);
    cy.get('[data-testid="hide-private-key"]').click();
  });

})