import React from 'react';
import { createComponents } from './lib/components';

import { COMPONENTS as GITHUB_PROFILE_COMPONENTS } from './screens/github-profile/index';
export const components = createComponents([...GITHUB_PROFILE_COMPONENTS]);
