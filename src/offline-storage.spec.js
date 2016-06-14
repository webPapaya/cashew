import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createOfflineStorage } from './offline-storage';

const createDummyAdapter = (data) => {
  let storedData = data;
  const retrieveStorage = () =>
    JSON.stringify(storedData);

  const updateStorage = (updateData) =>
    storedData = JSON.parse(updateData);

  return { retrieveStorage, updateStorage };
};

describe('offline storage', () => {
  describe('find by key', () => {
    it('retrieves value from store by key', () => {
      const adapter = createDummyAdapter({ dummy: 'data' });
      const offlineStore = createOfflineStorage({ adapter });

      assertThat(offlineStore.findByKey('dummy'), equalTo('data'));
    });
  });

  describe('update by key', () => {
    it('updates store by given object', () => {
      const adapter = createDummyAdapter({});
      const offlineStore = createOfflineStorage({ adapter });

      offlineStore.update({ myKey: 'myValue' });
      assertThat(offlineStore.findByKey('myKey'), equalTo('myValue'));
    });

    it('doesn\'t override existing data', () => {
      const adapter = createDummyAdapter({ existing: 'value' });
      const offlineStore = createOfflineStorage({ adapter });

      offlineStore.update({ myKey: 'myValue' });
      assertThat(offlineStore.findByKey('existing'), equalTo('value'));
    });
  });
});

