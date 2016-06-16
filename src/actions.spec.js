import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createStore } from './store';
import { createActions } from './actions';

describe('Actions', () => {
  describe('#updateCounter', () => {
    it('saves the new count', () => {
      const store = createStore();
      const actions = createActions({ store });

      actions.updateCounter(5);

      assertThat(store.retrieve(), equalTo({ counts: 5 }));
    });
  });

  describe('#incrementCounter', () => {
    it('increments the counter by 1', () => {
      const store = createStore();
      const actions = createActions({ store });

      actions.incrementCounter();

      assertThat(store.retrieve(), equalTo({ counts: 1 }));
    });
  });
});
