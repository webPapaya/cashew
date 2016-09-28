import {
  promiseThat,
  isFulfilledWith,
  assertThat,
  equalTo,
} from 'hamjest';

import { createStore } from './index';

const generateArray = (elements) => {
  const array = [];
  for (let i = 0; i < elements; i++) {
    array.push(void 0);
  }
  return array;
};

describe('store', () => {
  describe('race condition', () => {
    it('doesn\'t occur', () => {
      const length = 10;
      const store = createStore({ sessionData: { myData: [] } });
      const promises = generateArray(length).map((_element, index) => {
        return store.retrieve()
          .then((data) => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(data), Math.random() * 10);
            });
          })
          .then((data) => {
            store.saveInSession(data.myData.push(index));
          });
      });

      return Promise.all(promises)
        .then(store.retrieve)
        .then((data) => {
          assertThat(data.myData.length, equalTo(length));
        });
    });
  });

  describe('create', () => {
    describe('can be initialized with', () => {
      it('sessionData', () => {
        const sessionData = { session: 'data' };
        const store = createStore({ sessionData });

        promiseThat(store.retrieve(), isFulfilledWith(sessionData));
      });

      it('offlineData', () => {
        const offlineData = { offline: 'data' };
        const store = createStore({ offlineData });

        promiseThat(store.retrieve(), equalTo(offlineData));
      });
    });
  });

  describe('retrieve', () => {
    it('returns the stores data', () => {
      const store = createStore();
      promiseThat(store.retrieve(), equalTo({}));
    });

    it('responds data from session AND offline store', () => {
      const store = createStore();
      const offlineData = { offline: 'offline' };
      const sessionData = { session: 'session' };

      store.saveOffline(offlineData);
      store.saveInSession(sessionData);

      promiseThat(store.retrieve(), equalTo({ ...sessionData, ...offlineData }));
    });
  });

  describe('save', () => {
    describe('offline', () => {
      it('stores data', () => {
        const store = createStore();
        const data = { newData: 'offline' };
        store.saveOffline(data);

        promiseThat(store.retrieve(), equalTo(data));
      });

      it('notifies when data changed', () => {
        let wasCalled = 0;
        const store = createStore();
        return store.subscribe(() => { wasCalled += 1; })
          .then(() => store.saveOffline({}))
          .then(() => {
            assertThat(wasCalled, equalTo(2));
          });
      });
    });

    describe('session', () => {
      it('stores data', () => {
        const store = createStore();
        const data = { newData: 'session' };
        store.saveInSession(data);

        promiseThat(store.retrieve(), equalTo(data));
      });

      it('notifies when data changed', () => {
        let wasCalled = 0;
        const store = createStore();
        return store.subscribe(() => {  wasCalled += 1 })
          .then(() => store.saveInSession({}))
          .then(() => {
            assertThat(wasCalled, equalTo(2))
          });
      });
    });
  });

  describe('subscribe callback', () => {
    it('is called on construct', () => {
      let wasCalled = false;
      const store = createStore();
      return store.subscribe(() => { wasCalled = true; })
        .then(() => assertThat(wasCalled, equalTo(true)));
    });

    it('pushes store data to subscriptions', () => {
      const store = createStore();

      let wasCalledWith = void 0;
      store.subscribe((newData) => { wasCalledWith = newData; });

      const newData = { newData: 'newData' };
      store.saveOffline(newData)
        .then(() => assertThat(wasCalledWith, equalTo(newData)));
    });
  });
});
