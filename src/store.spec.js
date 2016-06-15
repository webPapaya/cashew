import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createStore } from './store';

describe('store', () => {
  describe('create', () => {
    xit('can be initialized with initial data', () => {
      const initialData = { initialData: 'initialData' };
      const store = createStore(initialData);

      assertThat(store.retrieve(), equalTo(initialData));
    });

    it('OR without initial data given, responds {}', () => {
      const store = createStore();
      assertThat(store.retrieve(), equalTo({}));
    });
  });

  describe('retrieve', () => {
    it('returns the stores data', () => {
      const store = createStore();
      assertThat(store.retrieve(), equalTo({}));
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






  describe('update', () => {
    it('stores new data in the store', () => {
      const store = createStore();
      const newData = { myData: 'will be stored' };

      store.update(newData);
      assertThat(store.retrieve(), equalTo(newData));
    });

    it('AND doesn\'t overwrite existing data', () => {
      const store = createStore();
      store.update({ firstUpdate: 'firstUpdate' });
      store.update({ secondUpdate: 'secondUpdate' });

      assertThat(store.retrieve(), equalTo({
        firstUpdate: 'firstUpdate',
        secondUpdate: 'secondUpdate',
      }));
    });
  });

  describe('subscribe callback', () => {
    it('is called on initialize', () => {
      let wasCalled = false;
      const store = createStore();
      store.subscribe(() => { wasCalled = true; });
      assertThat(wasCalled, equalTo(true));
    });

    it('AND is called as well on store update', () => {
      let wasCalled = 0;
      const store = createStore();
      store.subscribe(() => { wasCalled += 1; });
      store.update({});

      assertThat(wasCalled, equalTo(2));
    });
  });
});
