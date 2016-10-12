import { SCREENS } from './constants';
import { createBackendApi }  from './api';

export const createActions = ({ store, createApi = createBackendApi }) => {
  const api = createApi();
  const showLoadingScreen = () =>
    store.saveOffline({ currentScreen: SCREENS.loading });

  const showSignInScreen = () =>
    store.saveOffline({ currentScreen: SCREENS.signIn });

  const showApplicationScreen = () => Promise.resolve()
    .then(api.getUserList)
    .then((userList) => {
      store.saveOffline({ currentScreen: SCREENS.application, userList });
    });

  const storeCurrentUser = ({ username, twitter } = {}) =>
    store.saveOffline({ signedIn: true, currentUser: { username, twitter } });

  const removeCurrentUser = () =>
    store.saveOffline({ signedIn: false, currentUser: {} });

  const showUserDetail = ({ userId }) => Promise.resolve()
    .then(api.getUserList)
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
    .then(() => api.signIn({ username, password }))
    .then(storeCurrentUser)
    .then(showApplicationScreen)
    .catch(handleSignInError);

  const unsetPagination = () => Promise.resolve()
    .then(() => store.saveInLocation({ currentUserListPage: null }));

  const signOut = () => Promise.resolve()
    .then(showLoadingScreen)
    .then(removeErrors)
    .then(unsetPagination)
    .then(removeCurrentUser)
    .then(showSignInScreen);

  const jumpToPage = (pageNr) => {
    const normalizedPageNr = pageNr >= 1 ? pageNr : 1;
    return Promise.resolve()
      .then(() => store.saveInLocation({ currentUserListPage: normalizedPageNr }))
      .then(() => api.getUserList(normalizedPageNr))
      .then((userList) => store.saveOffline({ userList }));
  };

  return {
    jumpToPage,
    signIn,
    signOut,
    showUserDetail,
    showLoadingScreen,
    showSignInScreen,
  };
};

