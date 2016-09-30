import { SCREENS } from './constants';
import { createApi }  from './api';

export const createActions = ({ store }) => {
  const api = createApi();
  const showLoadingScreen = () =>
    store.saveOffline({ currentScreen: SCREENS.loading });

  const showSignInScreen = () =>
    store.saveOffline({ currentScreen: SCREENS.signIn });

  const showApplicationScreen = () => Promise.resolve()
    .then(api.apiGetUserList)
    .then((userList) => {
      store.saveOffline({ currentScreen: SCREENS.application, userList });
    });

  const storeCurrentUser = ({ username, twitter }) =>
    store.saveOffline({ signedIn: true, currentUser: { username, twitter } });

  const removeCurrentUser = () =>
    store.saveOffline({ signedIn: false, currentUser: {} });

  const showUserDetail = ({ userId }) => Promise.resolve()
    .then(api.apiGetUserList)
    .then((userList) => {
      alert(JSON.stringify(userList[userId]));
    });

  const addSignInError = () =>
    store.saveInSession({ errors: ['Couldn\'t sign in'] });

  const removeErrors = () =>
    store.saveInSession({ errors: [] });

  const handleSignInError = () => Promise.resolve()
    .then(addSignInError)
    .then(showSignInScreen);

  const signIn = ({ username, password }) => Promise.resolve()
    .then(showLoadingScreen)
    .then(removeErrors)
    .then(() => api.apiSignIn({ username, password }))
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

