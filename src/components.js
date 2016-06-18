import React from 'react';
import { createComponents } from './lib/components';

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

const Timer = ({ currentTime }) => {
  if (!currentTime) { return <div></div>; }
  return (
    <div>
      { currentTime.toUTCString() }
    </div>
  );
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    renderComponent: ({ appState, actions }) => {
      const { counts } = appState;
      return <Counter counts={ counts } actions={ actions }/>;
    },
  }, {
    domId: 'counter-2',
    construct: ({ actions }) => {
      actions.startClock();
    },
    renderComponent({ appState }) {
      const { currentTime } = appState;
      return <Timer currentTime={ currentTime } />;
    },
  }, {
    domId: 'counter-3',
    renderComponent: ({ appState, actions }) => {
      const { counts } = appState;
      return <Counter counts={ counts } actions={ actions } />;
    },
  },
];

export const components = createComponents(COMPONENTS);
