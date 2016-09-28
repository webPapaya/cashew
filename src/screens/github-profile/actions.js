import { SCREENS } from './constants';
import * as Api from './api';

const showLoadingScreen = (store) =>
  store.saveOffline({ currentScreen: SCREENS.loading });

const showSignInScreen = (store) =>
  store.saveOffline({ currentScreen: SCREENS.signIn });

const showApplicationScreen = (store) => Promise.resolve()
  .then(Api.apiGetUserList)
  .then((userList) => {
    store.saveOffline({ currentScreen: SCREENS.application, userList });
  });

const storeCurrentUser = (store, { username, twitter }) =>
  store.saveOffline({ signedIn: true, currentUser: { username, twitter } });

export const createActions = ({ store }) => {
  const removeCurrentUser = () =>
    store.saveOffline({ signedIn: false, currentUser: {} });

  const showUserDetail = ({ userId }) => Promise.resolve()
    .then(Api.apiGetUserList)
    .then((userList) => {
      alert(JSON.stringify(userList[userId]));
    });

  const addSignInError = () =>
    store.saveInSession({ errors: ['Couldn\'t sign in'] });

  const removeErrors = () =>
    store.saveInSession({ errors: [] });

  const handleSignInError = () => Promise.resolve()
    .then(addSignInError)
    .then(() => showSignInScreen(store));

  const signIn = ({ username, password }) => Promise.resolve()
    .then(() => showLoadingScreen(store))
    .then(removeErrors)
    .then(() => Api.apiSignIn({ username, password }))
    .then((...args) => storeCurrentUser(store, ...args))
    .then(() => showApplicationScreen(store))
    .catch(handleSignInError);

  const signOut = () => Promise.resolve()
    .then(() => showLoadingScreen(store))
    .then(removeErrors)
    .then(removeCurrentUser)
    .then(() => showSignInScreen(store));

  return { signIn, signOut, showUserDetail };
};

