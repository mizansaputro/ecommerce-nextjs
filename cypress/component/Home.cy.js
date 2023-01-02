import React from 'react'
import Home from '../../pages/home/index';
import {Provider} from 'react-redux';
import store from '../../redux/store/store';
import * as NextRouter from 'next/router';

describe('Home Component', () => {
  beforeEach(() => {
    cy.viewport(1440, 1440);
    cy.intercept(
      {
        method: 'GET', 
        url: '  http://localhost:3004/items', 
      },
      [] 
    ).as('getItems'); 
    const pathname = '/';
    const push = cy.stub();
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push });
    cy.mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
  it('renders', () => {
    
    
  })
})