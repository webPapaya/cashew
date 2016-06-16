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




store.subscribe((appState) => {
  const containerDomElement = document.getElementById('counter-1');
  if(containerDomElement) {
    const { counts } = appState;
    ReactDOM.render(<Counter counts={ counts }/>, containerDomElement);
  }
});


store.subscribe((appState) => {
  const containerDomElement = document.getElementById('counter-2');
  if(containerDomElement) {
    const { counts } = appState;
    ReactDOM.render(<Counter counts={ counts }/>, containerDomElement);
  }
});

store.subscribe((appState) => {
  const containerDomElement = document.getElementById('counter-3');
  if(containerDomElement) {
    const { counts } = appState;
    ReactDOM.render(<Counter counts={ counts }/>, containerDomElement);
  }
});
