import React from 'react';

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


class SignInScreen extends React.Component {
  render() {
    const onSubmit = () => {
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      this.props.onSubmit({ username, password });
    };

    return (
      <form>
        <input ref="username" type="text" />
        <input ref="password" type="password" />
        <button onClick={ onSubmit }>Login</button>
      </form>
    );
  }
}

const ApplicationScreen = ({ currentUser, onSignOut }) => {
  return (
    <ul>
      <li>{ currentUser.username }</li>
      <li>{ currentUser.twitter }</li>
      <li><a href="#" onClick={ onSignOut }>Sign out</a></li>
    </ul>
  );
};

const SCREENS = {
  loading: () => <div>Loading</div>,
  application: ({ appState, actions }) =>
    <ApplicationScreen
      currentUser={ appState.currentUser }
      onSignOut={ actions.signOut }
    />,

  default: ({ actions }) =>
    <SignInScreen onSubmit={ actions.signIn } />,
};

export const COMPONENTS = [{
  domId: 'counter-1',
  render({ appState, actions }) {
    const { currentScreen } = appState;
    const screenToRender = SCREENS[currentScreen] || SCREENS.default;
    return screenToRender({ appState, actions });
  },
}];
