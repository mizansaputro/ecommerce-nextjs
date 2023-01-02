import React from 'react'
import Navbar from '../../pages/navbar/navbar.jsx';



import {
  Provider
} from 'react-redux';
import store from '../../redux/store/store';
import * as NextRouter from 'next/router';
import axios from 'axios';
describe('Navbar Component', () => {
  beforeEach(() => {
    cy.viewport(1440, 750);
    cy.intercept({
        method: 'GET', // Route all GET requests
        url: '  http://localhost:3004/items', // that have a URL that matches '/users/*'
      },
      [] // and force the response to be: []
    ).as('getItems');
    const pathname = '/';
    const push = cy.stub();
    cy.stub(NextRouter, 'useRouter').returns({
      pathname,
      push
    });
    cy.mount( 
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
  });
  it('Check All Menus Are Visible', () => {
    cy.get('[data-cy="homeText"]').should("have.text", "HOME");
    cy.get('[data-cy="shopText"]').should("have.text", "SHOP");
    cy.get('[data-cy="bestSellersText"]').should("have.text", "BEST SELLERS");
    cy.get('[data-cy="collectionText"]').should("have.text", "COLLECTION");
    cy.get('[data-cy="contactUsText"]').should("have.text", "CONTACT US");
    cy.get('[data-cy="cartImg"]').should("be.visible");
    cy.get('[data-cy="searchImg"]').should("be.visible");
    cy.get('[data-cy="storeName"]').should("be.visible");
  })
  it('Shop Menu Click', () => {
    cy.get('[data-cy="shopText"]').click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).contains("shop/all")
    })
  })
  it('Home Menu Click', () => {
    cy.get('[data-cy="homeText"]').click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).contains("/")
    })
  })
})