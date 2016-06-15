import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createOfflineStorage } from './offline-storage';

describe('offline storage', () => {
  describe('retrieve', () => {
    it('responds the whole store', () => {
      const data = { dummy: 'data' };
      const offlineStore = createOfflineStorage({ initialData: data });

      assertThat(offlineStore.retrieve(), equalTo(data));
    });
  });
  
  describe('update', () => {
    it('updates store by given object', () => {
      const offlineStore = createOfflineStorage({ });

      const data = { myKey: 'myValue' };
      offlineStore.update(data);
      assertThat(offlineStore.retrieve(), equalTo(data));
    });

    it('AND doesn\'t override existing data', () => {
      const existingData = { existing: 'value' };
      const updateData = { myKey: 'myValue' };

      const offlineStore = createOfflineStorage({ initialData: existingData });
      offlineStore.update(updateData);

      assertThat(offlineStore.retrieve(),
        equalTo({ ...existingData, ...updateData }));
    });
  });
});

