import { Provider} from 'react-redux';
import Navbar from '../../pages/navbar/navbar';
import store from '../../redux/store/store';
import * as NextRouter from 'next/router';


describe('Testing Navbar Component', () => {
  beforeEach(() => {
    cy.viewport(1440, 1000);
    const pathname = '/';
    const push = cy.stub();
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    cy.mount(
      <Provider store={store}>
        <Navbar/>
      </Provider>
    )
    
  })
  it('Assert Element Navigasi Home', () => {
    cy.get('[data-cy="storeName"]').contains('fashionista');
    cy.get('[data-cy="homeText"]').contains('HOME');
    cy.get('[data-cy="shopText"]').contains('SHOP');
    cy.get('[data-cy="bestSellersText"]').contains('BEST SELLERS');
    cy.get('[data-cy="collectionText"]').contains('COLLECTION');
    cy.get('[data-cy="contactUsText"]').contains('CONTACT US');
    cy.get('[data-cy="cartImg"]').should('have.attr', 'src').should('include','cart');
    cy.get('[data-cy="searchImg"]').should('have.attr', 'src').should('include','search');
  })
  /*it('Click Nav Home', () => {
    cy.get('[data-cy="homeText"]').click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/");
    })
  })*/
  it('Click Nav Shop', () => {
    cy.get('[data-cy="shopText"]').click();
    cy.url().should('include', '/shop');
  })
})
