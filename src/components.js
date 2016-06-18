import React from 'react';
import { createComponents } from './lib/components';

const DirectoryListing = ({ actions }) => {};

const COMPONENTS = [
  {
    domId: 'counter-1',
    render({ actions }) {
      return <DirectoryListing actions={ actions }/>;
    },
  }
];

export const components = createComponents(COMPONENTS);
