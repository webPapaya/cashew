import React from 'react';
import { createComponents } from './lib/components';

const Loading = ({ allFiles, loadedFiles }) =>
  <div>
    { loadedFiles.length } of { allFiles.length } already loaded
  </div>
;

const Files = ({ actions, fileList }) => {
  const readFiles = (evt) =>
    actions.readFiles(evt.target.files);

  return (
    <div>
      <input type="file" multiple onChange={ readFiles }/>
      <ul>
        { fileList.map(({ name, loaded, dataUrl }, index) =>
          <File name={ name } loaded={ loaded } imgSrc={ dataUrl } key={ index } />) }
      </ul>
    </div>
  );
};

const File = ({ name, loaded, key, imgSrc }) => {
  const loadStatus = loaded
    ? 'was loaded'
    : 'not loaded yet';

  return (
    <li key={ key }>
      { name }, { loadStatus }
      <img src={ imgSrc } alt={ name } />
    </li>
  );
};

const DirectoryListing = ({ actions, fileList, loadedFiles }) => {
  const isFullyLoaded = loadedFiles.length !== fileList.length;
  return isFullyLoaded
    ? <Loading allFiles={ fileList } loadedFiles={ loadedFiles } />
    : <Files actions={ actions } fileList={ fileList } />;
};

const COMPONENTS = [
  {
    domId: 'counter-1',
    render({ actions, appState }) {
      const { fileList = [] } = appState;
      const loadedFiles = fileList.filter((file) => file.loaded);
      return (
        <DirectoryListing
          actions={ actions }
          fileList={ fileList }
          loadedFiles={ loadedFiles }
        />
      );
    },
  },
];

export const components = createComponents(COMPONENTS);
