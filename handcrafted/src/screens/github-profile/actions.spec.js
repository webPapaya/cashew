import { assertThat, equalTo } from 'hamjest';
import { createActions } from './actions';
import { SCREENS } from './constants'

const createStoreMock = () => {
  let data = void 0;
  return {
    retrieve: () => data,
    saveOffline: (newData) => {
      data = { ...data, ...newData };
      return data;
    },
    saveInSession: (newData) => {
      data = { ...data, ...newData };
      return data;
    },
  }
};

const createApiMock = () => ({
  signIn: () => Promise.resolve(),
  getUserList: () => Promise.resolve()
});

const initializeActions = () => {
  const store = createStoreMock();
  return { actions: createActions({ store, createApi: createApiMock }), store };
};

describe('showLoadingScreen()', () => {
  it('sets the currentScreen to loading', () => {
    const { actions } = initializeActions();
    assertThat(actions.showLoadingScreen(), equalTo({ currentScreen: SCREENS.loading}));
  });
});

describe('showSignInScreen()', () => {
  it('sets the currentScreen to loading', () => {
    const { actions } = initializeActions();
    assertThat(actions.showSignInScreen(), equalTo({ currentScreen: SCREENS.signIn}));
  });
});

describe('signIn', () => {
  it('redirects to application', () => {
    const { actions, store } = initializeActions();
    const username = 'username';
    const password = 'password';

    return actions.signIn({ username, password })
      .then(() => {
        const { currentScreen } = store.retrieve();
        assertThat(currentScreen, equalTo(SCREENS.application))
      });
  });
});

