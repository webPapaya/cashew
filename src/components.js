import React from 'react';
import { createComponents } from './lib/components';

import { COMPONENTS as TIMER_COMPONENTS } from './screens/timer/index';
export const components = createComponents([ ...TIMER_COMPONENTS ]);
