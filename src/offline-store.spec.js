const createOfflineStore = ({ adapter }) => {
  const find = (key) => {
    const data = adapter.retrieveStorage();
    return JSON.parse(data)[key];
  };

  return { find };
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
  describe('find', () => {
    it('retrieves value from store by key', () => {
      const adapter = createDummyAdapter({ dummy: 'data' });
      const offlineStore = createOfflineStore({ adapter });

      assertThat(offlineStore.find('dummy'), equalTo('data'));
    });
  });
});

