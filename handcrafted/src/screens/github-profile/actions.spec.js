import { assertThat, equalTo } from 'hamjest';
import { createActions } from './actions';
import { SCREENS } from './constants'

const createStoreMock = () => {
  return {
    saveOffline: (data) => data,
  }
};

const initializeActions = () => {
  const store = createStoreMock();
  return createActions({ store });
};

describe('showLoadingScreen()', () => {
  it('sets the currentScreen to loading', () => {
    const actions = initializeActions();
    assertThat(actions.showLoadingScreen(), equalTo({ currentScreen: SCREENS.loading}));
  });
});


