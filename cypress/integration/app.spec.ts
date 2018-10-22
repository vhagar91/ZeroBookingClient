describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect to "about" route', () => {
    cy.url().should('include', 'about');
  });

  it('should display current year in the footer', () => {
    cy.get('[data-testid=footer-year]').should(
      'contain',
      new Date().getFullYear().toString()
    );
  });

  it('should have "Features", menus', () => {
    cy.get('mat-toolbar button.nav-button').should(navItems => {
      expect(navItems).to.have.length(1);
      expect(navItems.eq(0)).to.contain('Features');
    });
  });
});
