// import { components } from './components';
// import { browser as bootstrapBrowser } from './lib/bootstrap';
//
// bootstrapBrowser({ components });

import { components } from './components';
import { single as bootstrapComponent } from './lib/bootstrap';

const domElement = global.document.getElementById('counter-1');
bootstrapComponent({ component: components[0], domElement });

