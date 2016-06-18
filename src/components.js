import React from 'react';
import { createComponents } from './lib/components';

const File = ({ name, loaded, key }) => {
  const loadStatus = loaded
    ? "was loaded"
    : "not loaded yet";

  return (
    <li key={ key }>
      { name }, { loadStatus }
    </li>
  );
};

const DirectoryListing = ({ actions, fileList }) => {
  const readFiles = (evt) => {
    actions.readFiles(evt.target.files);
  };

  return (
    <div>
      <input type="file" multiple onChange={ readFiles }/>
      <ul>
        { fileList.map(({name, loaded}, index) =>
          <File name={ name } loaded={ loaded } key={ index } />) }
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
