import React from 'react';

const Counter = ({ counts, actions }) => {
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

export const COMPONENTS = [
  {
    domId: 'counter-1',
    renderComponent: ({ appState, actions }) => {
      const { counts } = appState;
      return <Counter counts={ counts } actions={ actions }/>;
    },
  }, {
    domId: 'counter-2',
    renderComponent: ({ appState, actions }) => {
      const { counts } = appState;
      return <Counter counts={ counts } actions={ actions }/>;
    },
  }, {
    domId: 'counter-3',
    renderComponent: ({ appState, actions }) => {
      const { counts } = appState;
      return <Counter counts={ counts } actions={ actions } />;
    },
  },
];
