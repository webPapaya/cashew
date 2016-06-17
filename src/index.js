import ReactDOM from 'react-dom';

import { createStore } from './lib/store';
import { createActions } from './actions';
import { components } from './components';

const initializeComponent = ({ component, appState, actions }) => {
  if (!component.initialized) {
    component.initialize({ appState, actions });
    component.initialized = true;
  }
};

const destructComponent = ({ component }) => {
  if (component.initialized) {
    component.initialized = false;
  }
};

const renderComponentToDom = ({ component, domElement }) => {
  ReactDOM.render(component, domElement);
};

const store = createStore();
const actions = createActions({ store });

components.forEach((component) => {
  const { domId, renderComponent } = component;
  store.subscribe((appState) => {
    const domElement = document.getElementById(domId);
    if (domElement) {
      const renderedComponent = renderComponent({ appState, actions });
      initializeComponent({ component, appState, actions });
      renderComponentToDom({ component: renderedComponent, domElement });
    } else {
      destructComponent({ component });
    }
  });
});
