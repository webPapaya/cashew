import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from './store';
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
  const { counts } = appState;
  ReactDOM.render(<Counter counts={ counts }/>, document.getElementById('main'));
});
