import React from 'react';

export const createActions = ({ store }) => {
  const initialize = () => {
    console.log('initialize');
  };

  return { initialize };
};

export const COMPONENTS = [{
  domId: 'counter-1',
  render() {
    return (
      <div>hallo</div>
    );
  },
}];
