import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createStore } from './store';

describe('store', () => {
  describe('retrieve', () => {
    it('returns the stores data', () => {
      const store = createStore();
      assertThat(store.retrieve(), equalTo({}));
    });

    it('responds data from session AND offline store', () => {
      const store = createStore();
      const offlineData = { offline: 'offline' };
      const sessionData = { session: 'session' };

      store.saveOffline(offlineData);
      store.saveSession(sessionData);

      assertThat(store.retrieve(), equalTo({ ...sessionData, ...offlineData }));
    });
  });

  describe('save', () => {
    describe('offline', () => {
      it('stores data', () => {
        const store = createStore();
        const data = { newData: 'offline' };
        store.saveOffline(data);

        assertThat(store.retrieve(), equalTo(data));
      });

      it('notifies when data changed', () => {
        let wasCalled = 0;
        const store = createStore();
        store.subscribe(() => { wasCalled += 1; });
        store.saveOffline({});

        assertThat(wasCalled, equalTo(2));
      });
    });

    describe('session', () => {
      it('stores data', () => {
        const store = createStore();
        const data = { newData: 'session' };
        store.saveSession(data);

        assertThat(store.retrieve(), equalTo(data));
      });

      it('notifies when data changed', () => {
        let wasCalled = 0;
        const store = createStore();
        store.subscribe(() => { wasCalled += 1; });
        store.saveSession({});

        assertThat(wasCalled, equalTo(2));
      });
    });
  });

  describe('subscribe callback', () => {
    it('is called on initialize', () => {
      let wasCalled = false;
      const store = createStore();
      store.subscribe(() => { wasCalled = true; });
      assertThat(wasCalled, equalTo(true));
    });
  });
});
