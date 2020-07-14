describe('e2e tests - as a user', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('when I visit the app home page', () => {
    it('I see the hello world text', () => {
      cy.findByText('Hello World').should('exist');
    });
  });
});
