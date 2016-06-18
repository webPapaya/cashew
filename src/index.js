import ReactDOM from 'react-dom';

import { createStore } from './lib/store';
import { createActions } from './actions';
import { components } from './components';

const renderComponentToDom = ({ component, domElement }) => {
  ReactDOM.render(component, domElement);
};

const store = createStore();
const actions = createActions({ store });

components.forEach((component) => {
  const {
    domId,
    renderComponent,
  } = component;

  store.subscribe((appState) => {
    const domElement = document.getElementById(domId);
    if (domElement) {
      component.construct({ appState, actions });

      const renderedComponent = renderComponent({ appState, actions });
      renderComponentToDom({ component: renderedComponent, domElement });
    } else {
      component.destruct({ appState, actions });
    }
  });
});
