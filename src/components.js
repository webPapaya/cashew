import React from 'react';
import { createComponents } from './lib/components';


const Timer = ({ duration }) => {
  return <div>{ duration }</div>
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    construct({ store, actions }) {
      const interval = global.setInterval(() => { actions.tick() }, 1000);
      store.saveInSession({ interval, duration: 0 });
    },
    render({ appState }) {
      const { duration } = appState;
      return <Timer duration={ duration } />
    },
    destruct({ store }) {
      const { interval } = store.retrieve();
      global.clearInterval(interval);
    },
  },
];

export const components = createComponents(COMPONENTS);
