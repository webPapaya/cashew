import { deepMerge } from '../../external-deps/deep-merge';
import {
  createOfflineStorage,
  createSessionStorage,
  createLocationStorage,
} from './storage';

export const createStore = ({ sessionData = {}, offlineData = {}, locationData = {} } = {}) => {
  const updateCallbacks = [];
  const offlineStorage = createOfflineStorage({ initialData: offlineData });
  const sessionStorage = createSessionStorage({ initialData: sessionData });
  const locationStorage = createLocationStorage({ initialData: locationData });

  const retrieve = () => {
    const localStorageAndOffline = deepMerge(locationStorage.retrieve(), offlineStorage.retrieve());
    return deepMerge(localStorageAndOffline, sessionStorage.retrieve());
  };

  const subscribe = (next) => {
    next(retrieve());
    updateCallbacks.push(next);
  };

  const notify = () => updateCallbacks
    .forEach((callback) => { callback(retrieve()); });

  const saveOffline = (newData = {}) => {
    return offlineStorage
      .update(newData)
      .then(notify);
  };

  const saveInSession = (newData = {}) => {
    return sessionStorage
      .update(newData)
      .then(notify);
  };

  const saveInLocation = (newData = {}) => {
    return locationStorage
      .update(newData)
      .then(notify);
  };

  return { retrieve, subscribe, saveOffline, saveInSession, saveInLocation };
};
