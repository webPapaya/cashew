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

const apiGetUserList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { username: 'username1', twitter: '@username1'},
        { username: 'username2', twitter: '@username2'},
        { username: 'username3', twitter: '@username3'},
        { username: 'username4', twitter: '@username4'},
        { username: 'username5', twitter: '@username5'},
        { username: 'username6', twitter: '@username6'},
      ]);
    }, 500);
  });
};

export const createActions = ({ store }) => {
  const showLoadingScreen = () =>
    store.saveOffline({ currentScreen: SCREENS.loading });

  const showSignInScreen = () =>
    store.saveOffline({ currentScreen: SCREENS.signIn });

  const showApplicationScreen = () => Promise.resolve()
    .then(apiGetUserList)
    .then((userList) => {
      store.saveOffline({ currentScreen: SCREENS.application, userList });
    });

  const storeCurrentUser = ({ username, twitter }) =>
    store.saveOffline({ signedIn: true, currentUser: { username, twitter } });

  const removeCurrentUser = () =>
    store.saveOffline({ signedIn: false, currentUser: {} });

  const showUserDetail = ({ userId }) => Promise.resolve()
    .then(apiGetUserList)
    .then((userList) => {
      alert(JSON.stringify(userList[userId]));
    });

  const addSignInError = () =>
    store.saveInSession({ errors: ['Couldn\'t sign in'] });

  const removeErrors = () =>
    store.saveInSession({ errors: [] });

  const handleSignInError = () => {
    addSignInError();
    showSignInScreen();
  };

  const signIn = ({ username, password }) => Promise.resolve()
    .then(showLoadingScreen)
    .then(removeErrors)
    .then(() => apiSignIn({ username, password }))
    .then(storeCurrentUser)
    .then(showApplicationScreen)
    .catch(handleSignInError);

  const signOut = () => Promise.resolve()
    .then(showLoadingScreen)
    .then(removeErrors)
    .then(removeCurrentUser)
    .then(showSignInScreen);

  return { signIn, signOut, showUserDetail };
};

