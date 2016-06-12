import Rx from 'rxjs/Rx';
import React from 'react';
import ReactDOM from 'react-dom';

const rerenderLoop = new Rx.Subject();

const Counter = ({ data = 0 }) => {
  const increment = () => rerenderLoop.next(data + 1)
  
  return(
    <div>
      <div>{ data }</div>
      <button onClick={ increment }>Click me</button>
    </div>
  );
};

rerenderLoop.subscribe((data) => {
  ReactDOM.render(<Counter data={ data }/>, document.getElementById('main'));
});
rerenderLoop.next();
