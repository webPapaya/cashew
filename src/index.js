import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from './store';
import { createActions } from './actions';


const store = createStore({ counter: 0 });
const actions = createActions({ store });

const Counter = ({ clickAmount }) =>
  <div>
    <div>{ clickAmount }</div>
    <button onClick={ actions.incrementCounter }>Click me</button>
  </div>;



store.subscribe(() => {
  const { counter } = store.read();
  ReactDOM.render(<Counter clickAmount={ counter }/>, document.getElementById('main'));
});

store.update();
