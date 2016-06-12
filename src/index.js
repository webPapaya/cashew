import Rx from 'rxjs/Rx';
import React from 'react';
import ReactDOM from 'react-dom';

const rerenderLoop = new Rx.Subject();



const Counter = ({ clickAmount = 0 }) => {
  const increment = () => rerenderLoop.next(clickAmount + 1)

  return(
    <div>
      <div>{ clickAmount }</div>
      <button onClick={ increment }>Click me</button>
    </div>
  );
};

rerenderLoop.subscribe((data) => {
  ReactDOM.render(<Counter clickAmount={ data }/>, document.getElementById('main'));
});
rerenderLoop.next();
