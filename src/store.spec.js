import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createStore } from './store';

describe('store', () => {
  describe('create', () => {
    it('can be initialized with initial data', () => {
      const initialData = { initialData: 'initialData' };
      const store = createStore(initialData);

      assertThat(store.retrieve(), equalTo(initialData));
    });

    it('without initial data given, responds {}', () => {
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

  describe('update', () => {
    it('stores new data in the store', () => {
      const store = createStore();
      const newData = { myData: 'will be stored' };

      store.update(newData);
      assertThat(store.retrieve(), equalTo(newData));
    });

    it('doesn\'t overwrite existing data', () => {
      const store = createStore();
      store.update({ firstUpdate: 'firstUpdate' });
      store.update({ secondUpdate: 'secondUpdate' });

      assertThat(store.retrieve(), equalTo({
        firstUpdate: 'firstUpdate',
        secondUpdate: 'secondUpdate',
      }));
    });
  });
  
  describe('subscribe', () => {
    it('is called on initialize', () => {
      let wasCalled = false;
      const store = createStore();
      store.subscribe(() => { wasCalled = true; });
      assertThat(wasCalled, equalTo(true));
    });

    it('is called on store update', () => {
      let wasCalled = 0;
      const store = createStore();
      store.subscribe(() => { wasCalled += 1; });
      store.update({});

      assertThat(wasCalled, equalTo(2));
    });
  });
});
