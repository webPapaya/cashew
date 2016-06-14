const DEFAULT = 'default';
const TESTING = 'testing';

let currentEnv = DEFAULT;
const getEnv = () => currentEnv;
const setEnv = (env) => { currentEnv = env };


import {
  assertThat,
  equalTo,
} from 'hamjest';

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

