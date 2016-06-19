import React from 'react';
import { createComponents } from './lib/components';

const File = ({ name, loaded, key, imgSrc }) => {
  const loadStatus = loaded
    ? "was loaded"
    : "not loaded yet";

  return (
    <li key={ key }>
      { name }, { loadStatus }
      <img src={ imgSrc } alt={ name } />
    </li>
  );
};

const DirectoryListing = ({ actions, fileList, loadedFiles }) => {
  const readFiles = (evt) => {
    actions.readFiles(evt.target.files);
  };

  if(loadedFiles.length !== fileList.length) {
    return (
      <div>
        { loadedFiles.length } of { fileList.length } already loaded
      </div>
    )
  }

  return (
    <div>
      <input type="file" multiple onChange={ readFiles }/>
      <ul>
        { fileList.map(({name, loaded, dataUrl }, index) =>
          <File name={ name } loaded={ loaded } imgSrc={ dataUrl } key={ index } />) }
      </ul>
    </div>
  );
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    render({ actions, appState }) {
      const { fileList = [] } = appState;
      const loadedFiles = fileList.filter((file) => file.loaded );
      return <DirectoryListing actions={ actions } fileList={ fileList } loadedFiles={ loadedFiles } />;
    },
  }
];

export const components = createComponents(COMPONENTS);
