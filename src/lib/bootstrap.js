import ReactDOM from 'react-dom';

import { createStore } from './store/index';
import { createActions } from '../actions';

const shouldComponentRender = (domElement) => domElement;
const renderComponentToDom = ({ component, domElement }) => {
  ReactDOM.render(component, domElement);
};

export const browser = (components) => {
  const store = createStore();
  const actions = createActions({ store });

  components.forEach((component) => {
    store.subscribe((appState) => {
      const domElement = document.getElementById(component.domId);

      if (shouldComponentRender(domElement)) {
        component.construct({ appState, actions });

        const renderedComponent = component.render({ appState, actions });
        renderComponentToDom({ component: renderedComponent, domElement });
      } else {
        component.destruct({ appState, actions });
      }
    });
  });
};
