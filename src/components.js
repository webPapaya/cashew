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

const DirectoryListing = ({ actions, fileList, allFilesLoaded }) => {
  const readFiles = (evt) => {
    actions.readFiles(evt.target.files);
  };

  if(!allFilesLoaded) {
    return (
      <div>
        loading files
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
      const allFilesLoaded = fileList.every((file) => file.loaded );
      return <DirectoryListing actions={ actions } fileList={ fileList } allFilesLoaded={ allFilesLoaded } />;
    },
  }
];

export const components = createComponents(COMPONENTS);
