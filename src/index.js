import Rx from 'rxjs/Rx';
import React from 'react';
import ReactDOM from 'react-dom';

const rerenderLoop = new Rx.Subject();
const AppState = {
  counter: 0
};

const Actions = {
  incrementCounter() {
    AppState.counter += 1;
    rerenderLoop.next();
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

rerenderLoop.subscribe(() => {
  ReactDOM.render(<Counter clickAmount={ AppState.counter }/>, document.getElementById('main'));
});
rerenderLoop.next();
