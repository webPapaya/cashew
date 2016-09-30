import { createStorageAdapter } from '../../external-deps/local-storage';
import { createLocationAdapter } from '../../external-deps/location';

export const createOfflineStorage = (args = {}) => {
  const {
    initialData = {},
    adapterFn = createStorageAdapter,
  } = args;

  const adapter = adapterFn(JSON.stringify(initialData));

  const retrieve = () => {
    return Promise.resolve(JSON.parse(adapter.retrieveStorage()));
  };

  const update = (newData) => {
    return retrieve()
      .then((data) => {
        adapter.updateStorage(JSON.stringify({ ...data, ...newData }));
      })
      .then(() => retrieve());
  };

  return { retrieve, update };
};

export const createSessionStorage = ({ initialData = {} } = {}) => {
  let data = initialData;
  const retrieve = () => Promise.resolve(data);

  const update = (newData) => {
    data = { ...data, ...newData };
    return retrieve();
  };

  return { retrieve, update };
};


export const createLocationStorage = () => {
  const adapter = createLocationAdapter();

  const retrieve = () => Promise.resolve(adapter.retrieveLocation());
  const update = (newData) => {
    adapter.updateLocation(newData);
    return retrieve();
  };

  return { update, retrieve };
};