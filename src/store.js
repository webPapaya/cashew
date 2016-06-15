import {
  createOfflineStorage,
  createSessionStorage
} from './storage';

export const createStore = (initialData = {}) => {
  let data = initialData;
  const updateCallbacks = [];
  const offlineStorage = createOfflineStorage();
  const sessionStorage = createSessionStorage();

  const retrieve = () => ({
    ...data,
    ...offlineStorage.retrieve(),
    ...sessionStorage.retrieve(),
  });

  const subscribe = (next) => {
    next(data);
    updateCallbacks.push(next);
  };

  const notify = () => {
    updateCallbacks
      .forEach((callback) => { callback(data); });
  };

  const saveOffline = (newData = {}) => {
    offlineStorage.update(newData);
    notify();
  };

  const saveSession = (newData = {}) => {
    sessionStorage.update(newData);
    notify();
  };

  return { retrieve, subscribe, saveOffline, saveSession };
};
