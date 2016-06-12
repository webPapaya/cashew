import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from './store';

const createActions = ({ store }) => {
  const incrementCounter = () => {
    const { counter } = store.read();
    store.update({ counter: counter + 1 });
  };

  return { incrementCounter };
};

const store = createStore();
const actions = createActions({ store });

const Counter = ({ clickAmount = 0 }) =>
  <div>
    <div>{ clickAmount }</div>
    <button onClick={ actions.incrementCounter }>Click me</button>
  </div>;

store.subscribe(() => {
  const { counter } = store.read();
  ReactDOM.render(<Counter clickAmount={ counter }/>, document.getElementById('main'));
});

store.update();
