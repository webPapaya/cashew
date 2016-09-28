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
    return Promise.all([
      locationStorage.retrieve(),
      offlineStorage.retrieve(),
      sessionStorage.retrieve(),
    ]).then(([locationStorage, offlineStorage, sessionStorage]) => {
      const localStorageAndOffline = deepMerge(locationStorage, offlineStorage);
      return deepMerge(localStorageAndOffline, sessionStorage);
    });
  };

  const subscribe = (next) => retrieve()
    .then((appState) => next(appState))
    .then(() => updateCallbacks.push(next));

  const notify = () => retrieve()
    .then((appState) => Promise.all(updateCallbacks.map((callback) => callback(appState))));

  const saveInStorage = (storage, newData) => storage
    .update(newData)
    .then(notify);

  const saveOffline = (newData = {}) =>
    saveInStorage(offlineStorage, newData);

  const saveInSession = (newData = {}) =>
    saveInStorage(sessionStorage, newData);

  const saveInLocation = (newData = {}) =>
    saveInStorage(locationStorage, newData);

  return { retrieve, subscribe, saveOffline, saveInSession, saveInLocation };
};
