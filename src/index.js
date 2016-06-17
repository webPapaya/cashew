import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from './lib/store';
import { createActions } from './actions';

const store = createStore();
const actions = createActions({ store });

const Counter = ({ counts }) => {
  const updateCounter = (evt) => {
    const inputValue = parseInt(evt.currentTarget.value, 10);
    actions.updateCounter(inputValue);
  };

  return (
    <div>
      <div>{ counts }</div>
      <button onClick={ actions.incrementCounter }>Click me</button>
      <input type="range" min="-100" max="100" value={ counts } onChange={ updateCounter }/>
    </div>
  );
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    renderComponent: (appState) => {
      const { counts } = appState;
      return <Counter counts={ counts }/>;
    },
  }, {
    domId: 'counter-2',
    renderComponent: (appState) => {
      const { counts } = appState;
      return <Counter counts={ counts }/>;
    },
  }, {
    domId: 'counter-3',
    renderComponent: (appState) => {
      const { counts } = appState;
      return <Counter counts={ counts }/>;
    },
  },
];

COMPONENTS.forEach(({ domId, renderComponent }) => {
  store.subscribe((appState) => {
    const containerDomElement = document.getElementById(domId);
    if (containerDomElement) {
      ReactDOM.render(renderComponent(appState), containerDomElement);
    }
  });
});
