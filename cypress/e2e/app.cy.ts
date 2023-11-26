describe('App', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })


  it('Verificar se o filtro esta filtrando', () => {
    cy.get('[data-cy="filtro"]').type('1');
    cy.wait(1000);
    cy.get('.scroll').find('.post').should('have.length.greaterThan', 0);
  })

  it('Testando edicao', () => {
    cy.intercept({ method: 'put', url: 'https://jsonplaceholder.typicode.com/**'}).as('requisaoInterceptada');

    cy.get('[data-cy="edit"]').click();
    cy.get('[data-cy="id"]').type('1');
    cy.get('[data-cy="titulo"]').invoke('val', 'Alterando titulo').trigger('input');
    cy.get('[data-cy="descricao"]').invoke('val', 'Alterando descricao').trigger('input');
    cy.get('[data-cy="confirmar"]').click();

    cy.wait('@requisaoInterceptada').then(interceptacao => {
      const objetoEsperado = {id: 1, title: 'Alterando titulo', body: 'Alterando descrica', userId: 1};
      expect(interceptacao.response?.body).deep.equal(objetoEsperado);
    });
  })

})
