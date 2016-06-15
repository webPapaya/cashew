import { createStorageAdapter } from '../external-deps/local-storage';

export const createOfflineStorage = ({ initialData = {}, adapterFn = createStorageAdapter } = {}) => {
  const adapter = adapterFn(initialData);
  
  const retrieve = () =>
    JSON.parse(adapter.retrieveStorage());

  const update = (newData) => {
    const data = retrieve();
    adapter.updateStorage(JSON.stringify({ ...data, ...newData }));
  };

  return { retrieve, update };
};
