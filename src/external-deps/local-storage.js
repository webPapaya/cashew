import {
  TESTING,
  DEFAULT,
  getEnv,
} from '../environments';

export const createLocalStorageAdapter = (data = {}) => {
  if(getEnv() === TESTING) {
    let storedData = data;
    const retrieveStorage = () =>
      JSON.stringify(storedData);

    const updateStorage = (updateData) =>
      storedData = JSON.parse(updateData);

    return { retrieveStorage, updateStorage };
  } else if (getEnv() === DEFAULT) {
    const STORAGE_KEY = 'CASHEW_STORAGE';

    const retrieveStorage = () =>
      window.localStorage.getItem(STORAGE_KEY);

    const updateStorage = (updateData) =>
      window.location.setItem(STORAGE_KEY, updateData);

    return { retrieveStorage, updateStorage };
  }
};
