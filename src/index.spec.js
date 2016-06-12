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
});

