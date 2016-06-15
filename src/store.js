import {
  createOfflineStorage,
  createSessionStorage,
} from './storage';

export const createStore = () => {
  const updateCallbacks = [];
  const offlineStorage = createOfflineStorage();
  const sessionStorage = createSessionStorage();

  const retrieve = () => ({
    ...offlineStorage.retrieve(),
    ...sessionStorage.retrieve(),
  });

  const subscribe = (next) => {
    next(retrieve());
    updateCallbacks.push(next);
  };

  const notify = () => {
    updateCallbacks
      .forEach((callback) => { callback(retrieve()); });
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
