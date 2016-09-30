import ReactDOM from 'react-dom';

import { createStore } from './store/index';
import { createActions } from '../actions';

const shouldComponentRender = (domElement) => domElement;
const renderComponentToDom = ({ component, domElement }) =>
  ReactDOM.render(component, domElement);

const initialize = () => {
  const store = createStore();
  const actions = createActions({ store });
  return { store, actions };
};

export const browser = ({ components }) => {
  const { store, actions } = initialize();

  components.forEach((component) => {
    store.subscribe((appState) => {
      const domElement = global.document.getElementById(component.domId);

      if (!shouldComponentRender(domElement)) {
        component.destruct({ store, appState, actions });
      }

      Promise.resolve()
        .then(() => component.construct({ store, appState, actions }))
        .then(() => {
          const renderedComponent = component.render({ appState, actions });
          renderComponentToDom({ component: renderedComponent, domElement });
        });
    });
  });
};

export const single = ({ component, domElement }) => {
  const { store, actions } = initialize();
  store.subscribe((appState) => {
    Promise.resolve()
      .then(() => component.construct({ store, appState, actions }))
      .then(() => {
        const renderedComponent = component.render({ appState, actions });
        renderComponentToDom({ component: renderedComponent, domElement });
      });
  });
};
