import queryString from 'querystring'
import {Url} from 'url';

import {
  TESTING,
  getEnv,
} from '../lib/environments';

const browserLocation = () => {
  const retrieveLocation = () => {
    const search = (location.search || '').replace(/^\?/, '');
    return queryString.parse(search);
  };

  const updateLocation = (newData) => {
    const newLocation = new Url();
    newLocation.host = newData.host || location.host;
    newLocation.pathname = newData.pathname || location.pathname;
    newLocation.hostname = newData.hostname || location.hostname;
    newLocation.search = queryString.stringify(newData) || location.search;

    window.history.pushState(null, null, newLocation.format());
  };

  return {retrieveLocation, updateLocation};
};

const nodeLocation = (initialData = {}) => {
  let storedData = initialData;
  const retrieveLocation = () => storedData;

  const updateLocation = (updateData) =>
    storedData = updateData;

  return { retrieveLocation, updateLocation };
};

export const createLocationAdapter = (initialData) => {
  if (getEnv() === TESTING) { return nodeLocation(initialData); }
  if (initialData) { console.warn('Initial Data is ignored!'); }
  return browserLocation(initialData);
};
