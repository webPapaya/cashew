import { createLocalStorageAdapter } from './external-deps/local-storage';

export const createOfflineStorage = ({ adapter = createLocalStorageAdapter()}) => {
  const retrieveStorage = () =>
    JSON.parse(adapter.retrieveStorage());

  const findByKey = (key) =>
    retrieveStorage()[key];

  const update = (newData) => {
    const data = retrieveStorage();
    adapter.updateStorage(JSON.stringify({ ...data, ...newData }));
  };

  return { findByKey, update };
};
