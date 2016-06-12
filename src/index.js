import Rx from 'rxjs/Rx';
import React from 'react';
import ReactDOM from 'react-dom';

const createStore = () => {
  let data = { counter: 0 };
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

const store = createStore();
const Actions = {
  incrementCounter() {
    const { counter } = store.read();
    store.update({ counter: counter + 1});
  }
};

const Counter = ({ clickAmount = 0 }) => {
  return(
    <div>
      <div>{ clickAmount }</div>
      <button onClick={ Actions.incrementCounter }>Click me</button>
    </div>
  );
};

store.subscribe(() => {
  const { counter } = store.read();
  ReactDOM.render(<Counter clickAmount={ counter }/>, document.getElementById('main'));
});
store.update()

