import queryString from 'querystring';
import { Url } from 'url';
import { warn } from 'logger';

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
    const newSearch = { ...retrieveLocation(), ...newData };
    const newLocation = new Url();
    newLocation.host = location.host;
    newLocation.pathname = location.pathname;
    newLocation.hostname = location.hostname;
    newLocation.search = queryString.stringify(newSearch) || location.search;

    window.history.pushState(null, null, newLocation.format());
  };

  return { retrieveLocation, updateLocation };
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
  if (initialData) { warn('Initial Data is ignored!'); }
  return browserLocation(initialData);
};
