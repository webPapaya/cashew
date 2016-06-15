import {
  assertThat,
  equalTo,
} from 'hamjest';

import {
  createOfflineStorage,
  createSessionStorage,
} from './storage';

[
  { name: 'session', createStorage: createSessionStorage},
  { name: 'offline', createStorage: createOfflineStorage},
].forEach(({ name, createStorage }) => {
  describe(`${name} storage`, () => {
    describe('retrieve', () => {
      it('responds the whole store', () => {
        const data = { dummy: 'data' };
        const offlineStore = createStorage({ initialData: data });

        assertThat(offlineStore.retrieve(), equalTo(data));
      });
    });

    describe('update', () => {
      it('updates store by given object', () => {
        const offlineStore = createStorage();

        const data = { myKey: 'myValue' };
        offlineStore.update(data);
        assertThat(offlineStore.retrieve(), equalTo(data));
      });

      it('AND doesn\'t override existing data', () => {
        const existingData = { existing: 'value' };
        const updateData = { myKey: 'myValue' };

        const offlineStore = createStorage({ initialData: existingData });
        offlineStore.update(updateData);

        assertThat(offlineStore.retrieve(),
          equalTo({ ...existingData, ...updateData }));
      });
    });
  });
});

