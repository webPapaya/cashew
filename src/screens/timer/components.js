import React from 'react';

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

export const COMPONENTS = [
  {
    construct({ actions }) {
      actions.timer.start();
    },
    destruct({ actions }) {
      actions.timer.stop();
    },
    domId: 'counter-1',
    render({ appState, actions }) {
      const { duration } = appState;

      return (
        <Timer
          duration={ duration }
          onStart={ actions.timer.start }
          onPause={ actions.timer.pause }
          onStop={ actions.timer.stop }
        />
      );
    },
  },
];
