import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createLocalStorageAdapter } from './external-deps/local-storage';
import { createOfflineStorage } from './offline-storage';

describe('offline storage', () => {
  describe('find by key', () => {
    it('retrieves value from store by key', () => {
      const adapter = createLocalStorageAdapter({ dummy: 'data' });
      const offlineStore = createOfflineStorage({ adapter });

      assertThat(offlineStore.findByKey('dummy'), equalTo('data'));
    });
  });

  describe('update', () => {
    it('updates store by given object', () => {
      const adapter = createLocalStorageAdapter({});
      const offlineStore = createOfflineStorage({ adapter });

      offlineStore.update({ myKey: 'myValue' });
      assertThat(offlineStore.findByKey('myKey'), equalTo('myValue'));
    });

    it('doesn\'t override existing data', () => {
      const adapter = createLocalStorageAdapter({ existing: 'value' });
      const offlineStore = createOfflineStorage({ adapter });

      offlineStore.update({ myKey: 'myValue' });
      assertThat(offlineStore.findByKey('existing'), equalTo('value'));
    });
  });
});

