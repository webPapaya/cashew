// import { components } from './components';
// import { browser as bootstrapBrowser } from './lib/bootstrap';
//
// bootstrapBrowser({ components });

import { createComponent } from './lib/components';
import { COMPONENT } from './screens/github-profile/index';
import { single as bootstrapComponent } from './lib/bootstrap';

const component = createComponent(COMPONENT);
const domElement = global.document.getElementById(component.domId);
bootstrapComponent({ component, domElement });

