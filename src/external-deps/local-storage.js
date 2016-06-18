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

const browserLocalStorage = (initialData = JSON.stringify({})) => {
  const STORAGE_KEY = 'CASHEW_STORAGE';

  const retrieveStorage = () =>
    window.localStorage.getItem(STORAGE_KEY);

  const updateStorage = (updateData) =>
    window.localStorage.setItem(STORAGE_KEY, updateData);

  updateStorage(initialData);

  return { retrieveStorage, updateStorage };
};

export const createStorageAdapter = (data = {}) => {
  if (getEnv() === TESTING) { return nodeLocalStorage(data); }
  return browserLocalStorage(data);
};