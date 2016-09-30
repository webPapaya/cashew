// Render multiple elements dom
// import { components } from './components';
// import { browser as bootstrapBrowser } from './lib/bootstrap';
//
// bootstrapBrowser({ components });

// Render a single element to the dom

import { createComponent } from './lib/components';
import { SCREEN } from './screens/github-profile/index';
import { single as bootstrapComponent } from './lib/bootstrap';

const component = createComponent(SCREEN);
const domElement = global.document.getElementById(component.domId);
bootstrapComponent({ component, domElement });

