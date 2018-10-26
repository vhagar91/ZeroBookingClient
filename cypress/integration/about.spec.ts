describe('About', () => {
  beforeEach(() => {
    cy.visit('/zeroapp/about');
  });

  it('should display layout heading', () => {
    cy.get('h1').should('contain', 'Angular NgRx Material Starter');
  });

  it('should display "Geting Started" section', () => {
    cy.get('[data-testid="get-started"]').should('contain', 'Get started');
  });

  it('first action button should lead to "Features" route', () => {
    cy.get('.actions a')
      .first()
      .click();
    cy.url().should('include', 'features');
  });
});
