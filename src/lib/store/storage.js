import { createStorageAdapter } from '../../external-deps/local-storage';

export const createOfflineStorage = (args = {}) => {
  const {
    initialData = {},
    adapterFn = createStorageAdapter,
  } = args;

  const adapter = adapterFn(JSON.stringify(initialData));

  const retrieve = () =>
    JSON.parse(adapter.retrieveStorage());

  const update = (newData) => {
    const data = retrieve();
    adapter.updateStorage(JSON.stringify({ ...data, ...newData }));
  };

  return { retrieve, update };
};

export const createSessionStorage = ({ initialData = {} } = {}) => {
  let data = initialData;
  const retrieve = () => data;

  const update = (newData) => {
    data = { ...data, ...newData };
  };

  return { retrieve, update };
};
