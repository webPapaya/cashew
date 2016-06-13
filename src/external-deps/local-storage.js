export const createLocalStorageAdapter = () => {
  const STORAGE_KEY = 'CASHEW_STORAGE';

  const retrieveStorage = () =>
    window.localStorage.getItem(STORAGE_KEY);

  const updateStorage = (updateData) =>
    window.location.setItem(STORAGE_KEY, updateData);

  return { retrieveStorage, updateStorage };
};
