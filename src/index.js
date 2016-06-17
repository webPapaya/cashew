import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from './lib/store';
import { createActions } from './actions';
import { COMPONENTS } from './components';

const store = createStore();
const actions = createActions({ store });

COMPONENTS.forEach(({ domId, renderComponent }) => {
  store.subscribe((appState) => {
    const containerDomElement = document.getElementById(domId);
    if (containerDomElement) {
      ReactDOM.render(renderComponent({ appState, actions }), containerDomElement);
    }
  });
});
