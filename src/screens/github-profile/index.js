import React from 'react';

export const createActions = ({ store }) => {
  const initialize = () => {
    store.saveInSession({ initializing: true });
    setTimeout(() => {
      store.saveInSession({ initializing: false });
    }, 100);
  };

  return { initialize };
};

export const COMPONENTS = [{
  domId: 'counter-1',
  construct({ actions }) {
    actions.githubProfile.initialize();
  },
  render({ appState }) {
    const { initializing } = appState;
    return (
      <div>{ initializing ? 'loading' : 'not loading' }</div>
    );
  },
}];
