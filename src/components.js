import React from 'react';
import { createComponents } from './lib/components';

const Timer = ({ duration = 0, onPause, onStart, onStop }) => {
  return (
    <div>
      { duration }
      <a href="#" onClick={ onStart }>Start</a>
      <a href="#" onClick={ onPause }>Pause</a>
      <a href="#" onClick={ onStop }>Stop</a>
    </div>
  );
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    construct({ actions }) {
      actions.startTick();
    },
    render({ appState, actions }) {
      const { duration } = appState;
      return (
        <Timer
          duration={ duration }
          onPause={ actions.pauseTick }
          onStart={ actions.startTick }
          onStop={ actions.stopTick }
        />
      );
    },
    destruct({ store }) {
      const { interval } = store.retrieve();
      global.clearInterval(interval);
    },
  },
];

export const components = createComponents(COMPONENTS);
