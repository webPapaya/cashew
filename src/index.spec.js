import { createStore } from './index';
import {
  assertThat,
  equalTo
} from 'hamjest';

describe('store', () => {
  describe('read', () => {
    it('returns the stores data', () => {
      const store = createStore();
      assertThat(store.read(), equalTo({}))
    });
  });

  describe('update', () => {
    it('stores new data in the store', () => {
      const store = createStore();
      const newData = { myData: 'will be stored' };

      store.update(newData);
      assertThat(store.read(), equalTo(newData))
    });

    it('doesn\'t overwrite existing data', () => {
      const store = createStore();
      store.update({ firstUpdate: 'firstUpdate' });
      store.update({ secondUpdate: 'secondUpdate' });

      assertThat(store.read(), equalTo({
        firstUpdate: 'firstUpdate',
        secondUpdate: 'secondUpdate',
      }));
    });
  });
});

