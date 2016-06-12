import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from './store';
import { createActions } from './actions';

const INITIAL_STORE_DATA = { counter: 0 };

const store = createStore(INITIAL_STORE_DATA);
const actions = createActions({ store });

const Counter = ({ clickAmount }) => {
  const updateCounter = (evt) => {
    const inputValue = parseInt(evt.currentTarget.value, 10);
    actions.updateCounter(inputValue);
  };

  return (
    <div>
      <div>{ clickAmount }</div>
      <button onClick={ actions.incrementCounter }>Click me</button>
      <input type="range" min="-100" max="100" value={ clickAmount } onChange={ updateCounter }/>
    </div>
  );
};

store.subscribe(() => {
  const { counter } = store.read();
  ReactDOM.render(<Counter clickAmount={ counter }/>, document.getElementById('main'));
});
