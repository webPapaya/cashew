import { createLocalStorageAdapter } from './external-deps/local-storage';

export const createOfflineStorage = ({ adapter = createLocalStorageAdapter()}) => {
  const retrieve = () =>
    JSON.parse(adapter.retrieveStorage());

  const findByKey = (key) =>
    retrieve()[key];

  const update = (newData) => {
    const data = retrieve();
    adapter.updateStorage(JSON.stringify({ ...data, ...newData }));
  };

  return { retrieve, findByKey, update };
};
