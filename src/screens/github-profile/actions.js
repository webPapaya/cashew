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
    store.saveOffline({ currentScreen: 'loading' });
  };

  const showSignInScreen = () => {
    store.saveOffline({ currentScreen: 'sign-in' });
  };

  const showApplicationScreen = () => {
    store.saveOffline({ currentScreen: 'application' });
  };

  const storeCurrentUser = ({ username, twitter }) => {
    store.saveOffline({ currentUser: { username, twitter } });
  };

  const removeCurrentUser = () => {
    store.saveOffline({ currentUser: {} });
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

