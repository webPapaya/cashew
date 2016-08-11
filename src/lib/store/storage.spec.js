import {
  promiseThat,
  assertThat,
  equalTo,
  isFulfilledWith,
} from 'hamjest';

import {
  createOfflineStorage,
  createSessionStorage,
} from './storage';

[
  { name: 'session', createStorage: createSessionStorage },
  { name: 'offline', createStorage: createOfflineStorage },
].forEach(({ name, createStorage }) => {
  describe(`${name} storage`, () => {
    describe('retrieve', () => {
      it('responds the whole store', () => {
        const data = { dummy: 'data' };
        const offlineStore = createStorage({ initialData: data });

        return promiseThat(offlineStore.retrieve(), isFulfilledWith(data));
      });
    });

    describe('update', () => {
      it('updates store by given object', () => {
        const offlineStore = createStorage();

        const data = { myKey: 'myValue' };
        return offlineStore
          .update(data)
          .then(() => {
            return promiseThat(offlineStore.retrieve(), isFulfilledWith(data));
          });
      });

      it('AND doesn\'t override existing data', () => {
        const existingData = { existing: 'value' };
        const updateData = { myKey: 'myValue' };

        const offlineStore = createStorage({ initialData: existingData });
        return offlineStore
          .update(updateData)
          .then(() => promiseThat(
            offlineStore.retrieve(), isFulfilledWith({ ...existingData, ...updateData })));
      });

      it('AND responds updated data', () => {
        const updateData = { myKey: 'myValue' };

        const offlineStore = createStorage();
        return offlineStore
          .update(updateData)
          .then((updatedData) => {
            assertThat(updatedData, equalTo(updateData));
          });
      });
    });
  });
});
