const createOfflineStore = ({ adapter }) => {
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

import {
  assertThat,
  equalTo,
} from 'hamjest';

const createDummyAdapter = (data) => {
  let storedData = data;
  const retrieveStorage = () =>
    JSON.stringify(storedData);

  const updateStorage = (updateData) =>
    storedData = JSON.parse(updateData);

  return { retrieveStorage, updateStorage };
};

describe('offline store', () => {
  describe('find by key', () => {
    it('retrieves value from store by key', () => {
      const adapter = createDummyAdapter({ dummy: 'data' });
      const offlineStore = createOfflineStore({ adapter });

      assertThat(offlineStore.findByKey('dummy'), equalTo('data'));
    });
  });

  describe('update by key', () => {
    it('updates a value by given key', () => {
      const adapter = createDummyAdapter({});
      const offlineStore = createOfflineStore({ adapter });

      offlineStore.update({ myKey: 'myValue' });
      assertThat(offlineStore.findByKey('myKey'), equalTo('myValue'));
    });
  });
});

