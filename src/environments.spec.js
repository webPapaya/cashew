import {
  assertThat,
  equalTo,
} from 'hamjest';

import {
  DEFAULT,
  TESTING,
  getEnv,
  setEnv,
} from './environments';

describe('Environment', () => {
  describe('get environment', () => {
    it('defaults to default when nothing else was set', () => {
      assertThat(getEnv(), equalTo(DEFAULT))
    });
  });

  describe('set environment', () => {
    it('sets the given environment', () => {
      setEnv(TESTING);
      assertThat(getEnv(), equalTo(TESTING));
    });
  });
});

