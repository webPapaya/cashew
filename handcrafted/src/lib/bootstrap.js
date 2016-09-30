import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore } from './store/index';
import { createActions } from '../actions';

const shouldComponentRender = (domElement) => domElement;
const renderComponentToDom = ({ component, domElement }) =>
  ReactDOM.render(component, domElement);

export const browser = ({ components }) => {
  const store = createStore();
  const actions = createActions({ store });

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

export const server = (component) => {
  return ReactDOMServer.renderToString(component);
};
