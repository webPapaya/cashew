import { warn } from './logger';

import {
  TESTING,
  getEnv,
} from '../lib/environments';

const nodeLocalStorage = (initialData = '{}') => {
  let storedData = JSON.parse(initialData);
  const retrieveStorage = () =>
    JSON.stringify(storedData);

  const updateStorage = (updateData) =>
    storedData = JSON.parse(updateData);

  return { retrieveStorage, updateStorage };
};

const browserLocalStorage = () => {
  const STORAGE_KEY = 'CASHEW_STORAGE';

  const retrieveStorage = () =>
    window.localStorage.getItem(STORAGE_KEY);

  const updateStorage = (updateData) =>
    window.localStorage.setItem(STORAGE_KEY, updateData);

  return { retrieveStorage, updateStorage };
};

export const createStorageAdapter = (data = {}) => {
  if (getEnv() === TESTING) { return nodeLocalStorage(data); }
  if (data) { warn('Local Storage Adapter ignores initial data'); }
  return browserLocalStorage();
};
