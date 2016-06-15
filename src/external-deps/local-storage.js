import {
  TESTING,
  DEFAULT,
  getEnv,
} from '../environments';

const nodeLocalStorage = (initialData = {}) => {
  let storedData = initialData;
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
    window.location.setItem(STORAGE_KEY, updateData);

  updateStorage(initialData);

  return { retrieveStorage, updateStorage };
};

export const createLocalStorageAdapter = (data = {}) => {
  if(getEnv() === TESTING) {
    return nodeLocalStorage(data);
  } else if (getEnv() === DEFAULT) {
    return browserLocalStorage(data)
  }
};
