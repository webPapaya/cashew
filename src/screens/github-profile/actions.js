import { SCREENS } from './constants';

const FORBIDDEN = 400;
const apiSignIn = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if( username === 'username' && password === 'password' ) {
        return resolve({ username, twitter: '@webpapaya' });
      }
      reject({ statusCode: FORBIDDEN });
    }, 500);
  });
};

export const createActions = ({ store }) => {
  const showLoadingScreen = () => {
    store.saveOffline({ currentScreen: SCREENS.loading });
  };

  const showSignInScreen = () => {
    store.saveOffline({ currentScreen: SCREENS.signIn });
  };

  const showApplicationScreen = () => {
    store.saveOffline({ currentScreen: SCREENS.application });
  };

  const storeCurrentUser = ({ username, twitter }) => {
    store.saveOffline({ signedIn: true, currentUser: { username, twitter } });
  };

  const removeCurrentUser = () => {
    store.saveOffline({ signedIn: false, currentUser: {} });
  };

  const signIn = ({ username, password }) => Promise.resolve()
    .then(showLoadingScreen)
    .then(() => apiSignIn({ username, password }))
    .then(storeCurrentUser)
    .then(showApplicationScreen)
    .catch(showSignInScreen);

  const signOut = () => Promise.resolve()
    .then(showLoadingScreen)
    .then(removeCurrentUser)
    .then(showSignInScreen);

  return { signIn, signOut };
};

