import Rx from 'rxjs/Rx';
import React from 'react';
import ReactDOM from 'react-dom';

export const createStore = () => {
  let data = {};
  const renderLoop = new Rx.Subject();

  const read = () => ({ ...data });

  const subscribe = (...args) =>
    renderLoop.subscribe(...args);

  const update = (newData = {}) => {
    data = { ...data, ...newData };
    renderLoop.next(data);
  };

  return { read, update, subscribe };
};

const createActions = ({ store }) => {
  return {
    incrementCounter() {
      const { counter } = store.read();
      store.update({ counter: counter + 1 });
    }
  }
};

const store = createStore();
const actions = createActions({ store });

const Counter = ({ clickAmount = 0 }) => {
  return(
    <div>
      <div>{ clickAmount }</div>
      <button onClick={ actions.incrementCounter }>Click me</button>
    </div>
  );
};

// store.subscribe(() => {
//   const { counter } = store.read();
//   ReactDOM.render(<Counter clickAmount={ counter }/>, document.getElementById('main'));
// });

// store.update();

