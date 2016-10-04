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

const createSuccessApiMock = () => ({
  signIn: () => Promise.resolve(),
});

const createFailingApiMock = () => ({
  signIn: () => Promise.reject(),
});

const initializeActions = (createApi = createSuccessApiMock) => {
  const store = createStoreMock();
  return { actions: createActions({ store, createApi }), store };
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
  it('redirects to application on success', () => {
    const { actions, store } = initializeActions(createSuccessApiMock);
    const username = 'username';
    const password = 'password';

    return actions.signIn({ username, password })
      .then(() => {
        const { currentScreen } = store.retrieve();
        assertThat(currentScreen, equalTo(SCREENS.application))
      });
  });

  it('redirects to sign in on error', () => {
    const { actions, store } = initializeActions(createFailingApiMock);
    const username = 'username';
    const password = 'password';

    return actions.signIn({ username, password })
      .then(() => {
        const { currentScreen } = store.retrieve();
        assertThat(currentScreen, equalTo(SCREENS.signIn))
      });
  });
});

