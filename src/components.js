import React from 'react';
import { createComponents } from './lib/components';

const DirectoryListing = ({ actions, fileList }) => {
  const readFiles = (evt) => {
    actions.readFiles(evt.target.files);
  };

  return (
    <div>
      <input type="file" multiple onChange={ readFiles }/>
      <ul>
        { fileList.map(({ name }, index) => {
          return (
            <li key={ index }>
              { name }
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    render({ actions, appState }) {
      const { fileList = [] } = appState;
      return <DirectoryListing actions={ actions } fileList={ fileList } />;
    },
  }
];

export const components = createComponents(COMPONENTS);
